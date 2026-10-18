import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { Config } from "./opts";

export async function resolveDefines(config: Config) {
	let defines: Record<string, string> = {};

	if (config.defineFile) {
		const file = join(process.cwd(), config.defineFile);
		const mod = await import(pathToFileURL(file).href);
		const value = mod.default ?? mod.define ?? mod;
		defines = typeof value === "function" ? await value() : await value;
	}

	return {
		...config.define,
		...defines,
	};
}
