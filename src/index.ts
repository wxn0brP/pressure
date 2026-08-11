#!/usr/bin/env bun

import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { copyAssets } from "./assets";
import { buildCode } from "./esbuild";
import { generateModules } from "./gen";
import { buildHTML } from "./html";
import { config } from "./opts";

if (!existsSync(config.dir))
	mkdirSync(config.dir, {
		recursive: true,
	});

if (config.gen) {
	if (config.gen === true) {
		const srcDir = join(process.cwd(), "src");
		const outFile = join(srcDir, "__all_modules.ts");
		generateModules(
			srcDir,
			outFile,
			config.bannedFiles || [
				"self",
				"index",
			],
		);
	} else if (existsSync(config.gen)) {
		await import(process.cwd() + "/" + config.gen);
		console.log("[PRESSURE] Gen script executed", config.gen);
	}
}

const metafile = await buildCode(config);
await copyAssets(config);
await buildHTML(config);

if (config.singleFile && metafile) {
	const filesToDelete = Object.keys(metafile.outputs).filter(
		f => f.endsWith(".js") || f.endsWith(".css") || f.endsWith(".map"),
	);
	for (const file of filesToDelete) {
		if (existsSync(file)) rmSync(file);
	}
	const copiedAssets =
		config.assets?.map(a => {
			const name = a.split("/").pop();
			return `${config.dir}/${name}`;
		}) || [];
	for (const file of copiedAssets) {
		if (existsSync(file)) rmSync(file);
	}
	console.log("[PRESSURE] Cleaned up separate JS/CSS files");
}

console.log("[PRESSURE] Build Done");
