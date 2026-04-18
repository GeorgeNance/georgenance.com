import { spawnSync } from "node:child_process";
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import readline from "node:readline/promises";

const usage = `Usage: npm run article -- "Your Article Title"

Creates content/articles/YYYY-MM-DD-your-article-title.md and opens it in VS Code.`;

const titleArg = process.argv.slice(2).join(" ").trim();

if (titleArg === "--help" || titleArg === "-h") {
  console.log(usage);
  process.exit(0);
}

const rawTitle = titleArg || (await promptForTitle());

if (!rawTitle) {
  console.error(usage);
  process.exit(1);
}

const slug = slugify(rawTitle);

if (!slug) {
  console.error("Could not create a slug from that title.");
  process.exit(1);
}

const date = getLocalDate();
const articleDirectory = path.join(process.cwd(), "content", "articles");
const articleFileName = `${date}-${slug}.md`;
const articlePath = path.join(articleDirectory, articleFileName);
const template = buildTemplate({
  date,
  slug,
  title: rawTitle,
});

await mkdir(articleDirectory, { recursive: true });

const alreadyExists = await fileExists(articlePath);

if (!alreadyExists) {
  await writeFile(articlePath, template, "utf8");
  console.log(`Created ${path.relative(process.cwd(), articlePath)}`);
} else {
  console.log(`Opened existing ${path.relative(process.cwd(), articlePath)}`);
}

openInVsCode(articlePath, 9);

function buildTemplate({ title, description = "", date, slug }) {
  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `date: ${date}`,
    "tags: []",
    `slug: ${slug}`,
    "published: false",
    "---",
    "",
  ].join("\n");
}

async function promptForTitle() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return "";
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    return (await rl.question("Article title: ")).trim();
  } finally {
    rl.close();
  }
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function getLocalDate() {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function openInVsCode(filePath, lineNumber) {
  const target = `${filePath}:${lineNumber}:1`;
  const result = spawnSync("code", ["--goto", target], { stdio: "inherit" });

  if (result.error) {
    console.warn("");
    console.warn("Article file was created, but `code` was not available to open it.");
    console.warn(`Open it manually: ${path.relative(process.cwd(), filePath)}`);
    return;
  }

  if (result.status !== 0) {
    console.warn("");
    console.warn("Article file was created, but VS Code returned a non-zero exit code.");
    console.warn(`Open it manually: ${path.relative(process.cwd(), filePath)}`);
  }
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
