import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const repository = "nomo-frontend-portfolio";
const basePath = `/${repository}/`;
const clientDir = resolve("dist/client");
const outputDir = resolve("dist/pages");

async function renderHomePage() {
  const workerUrl = pathToFileURL(resolve("dist/server/index.js"));
  workerUrl.searchParams.set("pages-build", String(Date.now()));
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  if (!response.ok) {
    throw new Error(`Static render failed with status ${response.status}`);
  }

  let html = await response.text();

  // The portfolio is fully server-rendered. Removing the runtime scripts keeps
  // the GitHub Pages build static and avoids requests to an unavailable RSC server.
  html = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*>/gi, "")
    .replace(/\b(href|src)=(["'])\/(?!\/)/g, `$1=$2${basePath}`)
    .replaceAll("url(/_next/", `url(${basePath}_next/`);

  if (html.includes('src="/_next/') || html.includes('href="/_next/')) {
    throw new Error("Static HTML still contains root-relative Next.js assets");
  }

  return html;
}

async function rewriteCssAssets(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const entryPath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteCssAssets(entryPath);
      return;
    }

    if (entry.name.endsWith(".css")) {
      const css = await readFile(entryPath, "utf8");
      await writeFile(entryPath, css.replaceAll("/_next/", `${basePath}_next/`));
    }
  }));
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });
await rm(resolve(outputDir, "_headers"), { force: true });

const html = await renderHomePage();
await Promise.all([
  writeFile(resolve(outputDir, "index.html"), html),
  writeFile(resolve(outputDir, "404.html"), html),
  writeFile(resolve(outputDir, ".nojekyll"), ""),
  rewriteCssAssets(outputDir),
]);

console.log(`GitHub Pages artifact created at ${outputDir}`);
