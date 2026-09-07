import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

if (process.platform !== "linux" || process.arch !== "x64") {
  console.log(`Linux native dependency install skipped on ${process.platform}-${process.arch}.`);
  process.exit(0);
}

const loadPackage = createRequire(import.meta.url);
const projectPackage = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const rollupPackage = loadPackage("rollup/package.json");
const sharpPackage = loadPackage("sharp/package.json");

const sharpVersion = projectPackage.dependencies?.sharp;
const sharpBinaryVersion = sharpPackage.optionalDependencies?.["@img/sharp-linux-x64"];
const sharpLibvipsVersion = sharpPackage.optionalDependencies?.["@img/sharp-libvips-linux-x64"];

if (!sharpVersion || !sharpBinaryVersion || !sharpLibvipsVersion) {
  throw new Error("Unable to resolve the pinned Sharp Linux dependency versions.");
}

const packages = [
  `@rollup/rollup-linux-x64-gnu@${rollupPackage.version}`,
  `sharp@${sharpVersion}`,
  `@img/sharp-linux-x64@${sharpBinaryVersion}`,
  `@img/sharp-libvips-linux-x64@${sharpLibvipsVersion}`,
];

execFileSync(
  "npm",
  [
    "install",
    "--no-save",
    "--package-lock=false",
    "--include=optional",
    "--cpu=x64",
    "--os=linux",
    "--libc=glibc",
    ...packages,
  ],
  { cwd: projectRoot, stdio: "inherit" },
);

const { default: sharp } = await import("sharp");
console.log("Sharp Linux ready:", sharp.versions.sharp, "libvips", sharp.versions.vips);
