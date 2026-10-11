import { renderHTML } from "@wxn0brp/falcon-frame";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { Config } from "./opts";

export async function buildHTML(config: Config) {
	const { html: files, htmlPath, dir, singleFile, vars } = config;
	if (!files.length) return console.log("[PRESSURE] No HTML files found");

	const FFVar: Record<string, any> = {
		...vars,
	};
	const [from, to] = htmlPath.split(":");

	const data: Record<string, any> = {};

	if (existsSync("pressure/html.json"))
		Object.assign(
			data,
			JSON.parse(readFileSync("pressure/html.json", "utf-8")),
		);

	if (existsSync("pressure/html.ts"))
		Object.assign(data, await import(process.cwd() + "/pressure/html"));

	if (existsSync("pressure/vars.json"))
		Object.assign(
			FFVar,
			JSON.parse(readFileSync("pressure/vars.json", "utf-8")),
		);

	const layoutPath = FFVar.layout ? path.resolve(FFVar.layout) : null;
	const filesToProcess = files.filter(f => path.resolve(f) !== layoutPath);

	for (const file of filesToProcess) {
		let html = renderHTML({
			templatePath: file,
			data,
			FFVar,
		});

		if (singleFile && dir) {
			html = await inlineAssets(html, dir);
		}

		const path = file.replace(from, to);
		writeFileSync(path, html);
	}

	console.log("[PRESSURE] HTML Build Done");
	for (const file of filesToProcess) console.log(` - ${file}`);
}

async function inlineAssets(html: string, dir: string): Promise<string> {
	html = html.replace(
		/<script\s([^>]*?)src="([^"]+)"([^>]*)><\/script>/g,
		(match, before, src, after) => {
			const filePath = `${dir}/${src}`;
			if (existsSync(filePath)) {
				const content = readFileSync(filePath, "utf-8");
				const attrs = `${before}${after}`;
				const typeMatch = attrs.match(/type="([^"]+)"/);
				const typeAttr = typeMatch ? ` type="${typeMatch[1]}"` : "";
				return `<script${typeAttr}>${content}</script>`;
			}
			return match;
		},
	);

	html = html.replace(
		/<link\s+rel="stylesheet"\s+href="([^"]+)"[^>]*>/g,
		(match, href) => {
			const filePath = `${dir}/${href}`;
			if (existsSync(filePath)) {
				const content = readFileSync(filePath, "utf-8");
				return `<style>${content}</style>`;
			}
			return match;
		},
	);

	return html;
}
