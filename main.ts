import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");
copyFileSync(src, dst);
const srcSize = statSync(src).size;
const dstSize = statSync(dst).size;
if (srcSize !== dstSize) {
  throw new Error(`entry.png size mismatch: source ${srcSize} vs copied ${dstSize}`);
}
console.log(`entry.png copied to ${outDir} (${dstSize} bytes, verified)`);
