import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
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
}

test("server-renders the complete Nomo portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Nomo - Nguyen Thai Nguyen \| Frontend Developer<\/title>/i);
  assert.match(html, /<meta(?=[^>]*name="viewport")(?=[^>]*minimum-scale=1)(?=[^>]*maximum-scale=1)(?=[^>]*user-scalable=no)[^>]*>/i);
  assert.match(html, /aria-label="Open navigation"/i);
  assert.match(html, /Interactive terminal mini game/i);
  assert.equal((html.match(/class="marquee-group"/g) ?? []).length, 2);
  assert.match(html, /Code with purpose\./i);
  assert.match(html, /GFT Career Connect AI/i);
  assert.match(html, /Filter projects by technology/i);
  assert.match(html, /message\.preview\.js/i);
  assert.match(html, /Nguyen Thai Nguyen \/ Nomo/i);
});

test("server-renders the custom 404 route", async () => {
  const response = await render("/missing-page");
  assert.equal(response.status, 404);

  const html = await response.text();
  assert.match(html, />404</i);
  assert.match(html, /This path does not exist\./i);
  assert.match(html, /back-to-home/i);
});
