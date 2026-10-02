import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";

export interface Config {
	external?: string[];
	entryPoints?: string[];
	dir?: string;
	html?: string[];
	htmlPath?: string;
	assets?: string[];
	singleFile?: boolean;
	minify?: boolean;
	split?: boolean;
	jsx?: boolean;
	gen?: boolean | string;
	bannedFiles?: string[];
}

const { values } = parseArgs({
	args: process.argv.slice(2),
	options: {
		help: {
			type: "boolean",
			default: false,
			short: "h",
		},
		version: {
			type: "boolean",
			default: false,
			short: "v",
		},
		dir: {
			type: "string",
			short: "d",
		},
		entry: {
			type: "string",
			short: "s",
		},
		external: {
			type: "string",
			short: "e",
		},
		html: {
			type: "string",
			short: "i",
		},
		hp: {
			type: "string",
		},
		assets: {
			type: "string",
			short: "a",
		},
		workflow: {
			type: "boolean",
			default: false,
		},
		"single-file": {
			type: "boolean",
			default: false,
		},
		"no-minify": {
			type: "boolean",
			default: false,
		},
		"no-split": {
			type: "boolean",
			default: false,
		},
		jsx: {
			type: "boolean",
			default: false,
		},
		gen: {
			type: "string",
			short: "g",
		},
		"banned-files": {
			type: "string",
		},
		"config-file": {
			type: "string",
			short: "f",
			default: "pressure.json",
		},
	},
	allowPositionals: true,
	allowNegatives: true,
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

if (existsSync(values["config-file"]))
	configFile = JSON.parse(readFileSync(values["config-file"], "utf-8"));

export const config: Config = {
	dir: values.dir || configFile.dir || "dist",
	entryPoints: configFile.entryPoints || [
		"src/index.ts",
	],
	external: configFile.external || [],
	html: configFile.html || [
		"public/index.html",
	],
	htmlPath: values.hp || configFile.htmlPath || "public:dist",
	assets: configFile.assets || [],
	singleFile: values["single-file"] || configFile.singleFile || false,
	minify: values["no-minify"]
		? false
		: configFile.minify !== undefined
			? configFile.minify
			: true,
	split: values["no-split"]
		? false
		: configFile.split !== undefined
			? configFile.split
			: true,
	jsx: values.jsx || configFile.jsx || false,
	gen: values.gen
		? values.gen
		: configFile.gen !== undefined
			? configFile.gen
			: false,
	bannedFiles: values["banned-files"]
		? values["banned-files"].split(",").filter(Boolean)
		: configFile.bannedFiles || [
				"self",
				"index",
			],
};

if (values.entry) config.entryPoints = values.entry.split(",").filter(Boolean);
if (values.external)
	config.external = values.external.split(",").filter(Boolean);
if (values.html) config.html = values.html.split(",").filter(Boolean);
if (values.assets) config.assets = values.assets.split(",").filter(Boolean);

if (values.workflow) writeFileSync("pressure-out-dir.log", config.dir);
