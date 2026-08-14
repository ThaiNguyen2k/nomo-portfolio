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
  assert.match(html, /Interactive snake mini game/i);
  assert.match(html, /arrow keys or WASD to steer/i);
  assert.match(html, /collect the orb · avoid walls and your trail/i);
  assert.match(html, /view top 10/i);
  assert.match(html, /server verified/i);
  assert.match(html, /02.*full-stack products delivered/is);
  assert.match(html, /GMT\+7 · VIETNAM/i);
  assert.match(html, /Move up/i);
  assert.ok(html.indexOf('class="contact-section"') < html.indexOf('class="section-shell terminal-game"'));
  assert.ok(html.indexOf('class="section-shell terminal-game"') < html.indexOf('class="site-footer"'));
  assert.equal((html.match(/class="marquee-group"/g) ?? []).length, 2);
  assert.match(html, /Code with purpose\./i);
  assert.match(html, /GFT Career Connect AI/i);
  assert.match(html, /Independent Projects/i);
  assert.match(html, /Built GFT Career Connect AI and NutriVision AI end to end/i);
  assert.match(html, /Filter projects by technology/i);
  assert.match(html, /message\.preview\.js/i);
  assert.match(html, /send-message/i);
  assert.match(html, /formsubmit\.co\/nguyendragon2000@gmail\.com/i);
  assert.match(html, /\?contact=sent#contact/i);
  assert.match(html, /contact-verification-frame/i);
  assert.match(html, /Complete the contact form CAPTCHA/i);
  assert.doesNotMatch(html, /name="_captcha" value="false"/i);
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
