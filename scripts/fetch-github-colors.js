import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json";
const OUTPUT = path.resolve(__dirname, "../public/github-colors.json");

async function fetchColors() {
  console.log("[Build-Time] Fetching github-colors...");
  try {
    const res = await fetch(SOURCE);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

    const data = await res.json();
    const colors = {};
    for (const key in data) {
      if (data[key].color) colors[key] = data[key].color;
    }

    fs.writeFileSync(OUTPUT, JSON.stringify(colors));
    console.log(`[Build-Time] github-colors generated (${Object.keys(colors).length} languages)`);
  } catch (error) {
    console.error("ERROR during github-colors fetch:", error.message);
    if (fs.existsSync(OUTPUT)) {
      console.warn("[Build-Time] Using existing file as fallback");
      return;
    }
    process.exit(1);
  }
}

fetchColors();
