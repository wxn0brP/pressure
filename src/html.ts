import { renderHTML } from "@wxn0brp/falcon-frame";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { Config } from "./opts";

export async function buildHTML(config: Config) {
	const { html: files, htmlPath, dir, singleFile } = config;
	if (!files.length) return console.log("[PRESSURE] No HTML files found");

	let FFVar: Record<string, any> = {};
	const [from, to] = htmlPath.split(":");

	let data: Record<string, any> = {};

	if (existsSync("pressure/html.json"))
		Object.assign(
			data,
			JSON.parse(readFileSync("pressure/html.json", "utf-8")),
		);

	if (existsSync("pressure/html.ts"))
		Object.assign(data, await import(process.cwd() + "/pressure/html"));

	if (existsSync("pressure/vars.json"))
		FFVar = JSON.parse(readFileSync("pressure/vars.json", "utf-8"));

	for (const file of files) {
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

	console.log("[PRESSURE] HTML Build Done", files);
}

async function inlineAssets(html: string, dir: string): Promise<string> {
	html = html.replace(
		/<script\s+src="([^"]+)"[^>]*><\/script>/g,
		(match, src) => {
			const filePath = `${dir}/${src}`;
			if (existsSync(filePath)) {
				const content = readFileSync(filePath, "utf-8");
				return `<script>${content}</script>`;
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
