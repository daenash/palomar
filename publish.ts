import { parseArgs } from "util";
import { writeFileSync } from "fs";

import rootPackageJSON from "./package.json";
import clientPackageJSON from "./packages/client/package.json";
import serverPackageJSON from "./packages/server/package.json";
import { $ } from "bun";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    major: {
      type: "boolean",
      default: false,
    },
    minor: {
      type: "boolean",
      default: false,
    },
    patch: {
      type: "boolean",
      default: false,
    },
  },
  strict: true,
  allowPositionals: true,
});

const onlyOneFlag = Object.values(values).reduce<number>((pv, a) => {
  return pv + Number(a);
}, 0);

if (onlyOneFlag !== 1) {
  console.error("One and ONLY one version type should be set!");
  process.exit(0);
}

let [major, minor, patch] = rootPackageJSON.version
  .split(".")
  .map((e) => Number(e));

if (values.major) {
  major++;
  minor = 0;
  patch = 0;
}
if (values.minor) {
  minor++;
  patch = 0;
}
if (values.patch) {
  patch++;
}

const newVersion = [major, minor, patch].join(".");

clientPackageJSON.version = newVersion;
serverPackageJSON.version = newVersion;
rootPackageJSON.version = newVersion;

writeFileSync(
  "./packages/client/package.json",
  JSON.stringify(clientPackageJSON)
);
writeFileSync(
  "./packages/server/package.json",
  JSON.stringify(serverPackageJSON)
);
writeFileSync("./package.json", JSON.stringify(rootPackageJSON));

await $`bunx prettier ./packages/client/package.json --write`;
await $`bunx prettier ./packages/server/package.json --write`;
await $`bunx prettier ./package.json --write`;
await $`git config user.name github-actions-release`;
await $`git config user.email github-actions-release@github.com`;
await $`git add .`;
await $`git commit -m "Published new version: ${newVersion}"`;
await $`git tag "v${newVersion}"`;
await $`git push --tags`;
