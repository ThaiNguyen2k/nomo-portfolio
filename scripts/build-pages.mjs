import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const repository = "nomo-portfolio";
const basePath = `/${repository}/`;
const clientDir = resolve("dist/client");
const outputDir = resolve("dist/pages");

async function renderPage(worker, pathname, acceptedStatuses) {
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
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

  if (!acceptedStatuses.includes(response.status)) {
    throw new Error(`Static render for ${pathname} failed with status ${response.status}`);
  }

  let html = await response.text();

  html = html
    .replace(/\b(href|src)=(["'])\/(?!\/)/g, `$1=$2${basePath}`)
    .replaceAll("url(/_next/", `url(${basePath}_next/`);

  if (html.includes('src="/_next/') || html.includes('href="/_next/')) {
    throw new Error("Static HTML still contains root-relative Next.js assets");
  }

  return html;
}

async function rewriteStaticAssets(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const entryPath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteStaticAssets(entryPath);
      return;
    }

    if (entry.name.endsWith(".css") || entry.name.endsWith(".js")) {
      const source = await readFile(entryPath, "utf8");
      await writeFile(entryPath, source.replaceAll("/_next/", `${basePath}_next/`));
    }
  }));
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });
await rm(resolve(outputDir, "_headers"), { force: true });

const workerUrl = pathToFileURL(resolve("dist/server/index.js"));
workerUrl.searchParams.set("pages-build", String(Date.now()));
const { default: worker } = await import(workerUrl.href);
const [html, notFoundHtml] = await Promise.all([
  renderPage(worker, "/", [200]),
  renderPage(worker, "/missing-page", [404]),
]);
await Promise.all([
  writeFile(resolve(outputDir, "index.html"), html),
  writeFile(resolve(outputDir, "404.html"), notFoundHtml),
  writeFile(resolve(outputDir, ".nojekyll"), ""),
  rewriteStaticAssets(outputDir),
]);

console.log(`GitHub Pages artifact created at ${outputDir}`);
