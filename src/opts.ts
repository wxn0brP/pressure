import { existsSync, readFileSync } from "node:fs";
import { parseArgs } from "node:util";

export interface Config {
    external?: string[];
    entryPoints?: string[];
    dir?: string;
    html?: string[];
    htmlPath?: string;
    assets?: string[];
}

const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
        help: {
            type: "boolean",
            default: false,
            short: "h"
        },
        version: {
            type: "boolean",
            default: false,
            short: "v"
        },
        dir: {
            type: "string",
            short: "d"
        },
        entry: {
            type: "string",
            short: "s"
        },
        external: {
            type: "string",
            short: "e"
        },
        html: {
            type: "string",
            short: "i"
        },
        hp: {
            type: "string"
        },
        assets: {
            type: "string",
            short: "a"
        }
    },
    allowPositionals: true,
    allowNegatives: true
});

if (values.help) {
    await import("./help");
    process.exit(0);
}

if (values.version) {
    console.log(require("../package.json").version);
    process.exit(0);
}

let configFile: Config = {};

if (existsSync("pressure.json")) configFile = JSON.parse(readFileSync("pressure.json", "utf-8"));

export const config: Config = {
    dir: values.dir || configFile.dir || "dist",
    entryPoints: configFile.entryPoints || ["src/index.ts"],
    external: configFile.external || [],
    html: configFile.html || ["public/index.html"],
    htmlPath: values.hp || configFile.htmlPath || "public:dist",
    assets: configFile.assets || []
}

if (values.entry) config.entryPoints = values.entry.split(",").filter(Boolean);
if (values.external) config.external = values.external.split(",").filter(Boolean);
if (values.html) config.html = values.html.split(",").filter(Boolean);
if (values.assets) config.assets = values.assets.split(",").filter(Boolean);