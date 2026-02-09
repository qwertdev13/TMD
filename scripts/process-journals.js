const fs = require("fs");
const path = require("path");

const JOURNAL_DIR = "./journals";
const OUTPUT_DIR = "./public/journals";
const INDEX_HTML = "./index.html";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const journalFiles = fs.readdirSync(JOURNAL_DIR).filter(f => f.endsWith(".txt"));

let boxesHTML = "";

for (const file of journalFiles) {
  const raw = fs.readFileSync(path.join(JOURNAL_DIR, file), "utf8");
  const lines = raw.split("\n");

  let title = "";
  let description = "";
  let body = [];

  for (let line of lines) {
    line = line.trim();

    if (line.startsWith("# ") && !title) {
      title = line.slice(2);
      continue;
    }

    if (line.startsWith("## ") && !description) {
      description = line.slice(3);
      continue;
    }

    if (line.startsWith("//") && line.endsWith("//")) {
      body.push(`<h2>${line.replaceAll("/", "").trim()}</h2>`);
      continue;
    }

    if (line !== "") {
      body.push(`<p>${line}</p>`);
    }
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  fs.writeFileSync(
    `${OUTPUT_DIR}/${slug}.html`,
    `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/styles.css">
<title>${title}</title>
</head>
<body>
<main>
<h1>${title}</h1>
${body.join("\n")}
</main>
</body>
</html>`
  );

  boxesHTML += `
<div class="document-box">
    <a href="/journals/${slug}.html">${title}</a> <br><br> ${description}
</div>
`;
}

let index = fs.readFileSync(INDEX_HTML, "utf8");

index = index.replace(
  /<!-- JOURNAL_BOXES -->/,
  boxesHTML.trim()
);

fs.writeFileSync(INDEX_HTML, index);
