const BASE = "https://luna.macaron-software.com";
const LOCALES = [
  "ar",
  "bg",
  "bn",
  "ca",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "es",
  "et",
  "fa",
  "fi",
  "fil",
  "fr",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "ka",
  "ko",
  "lt",
  "lv",
  "mk",
  "ms",
  "nb",
  "nl",
  "pl",
  "pt",
  "pt-BR",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "sw",
  "th",
  "tr",
  "uk",
  "ur",
  "vi",
  "zh",
  "zh-TW"
];
const PAGES = [
  { path: "/", priority: "1.0", changefreq: "weekly" }
];
function hreflangLinks(path) {
  const url = `${BASE}${path}`;
  const lines = LOCALES.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url}"/>`
  );
  lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url}"/>`);
  return lines.join("\n");
}
const GET = () => {
  const urls = PAGES.map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${BASE}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangLinks(path)}
  </url>`
  ).join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls}
</urlset>`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
};
export {
  GET
};
