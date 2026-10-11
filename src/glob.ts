import { existsSync, readdirSync } from "fs";
import { join } from "path";
import picomatch from "picomatch";

export function expandGlobs(patterns: string[]) {
	const result: string[] = [];

	for (const pattern of patterns) {
		if (!pattern.includes("*") && !pattern.includes("?")) {
			result.push(pattern);
			continue;
		}

		const parts = pattern.split("/");
		let baseDir = ".";
		for (let i = 0; i < parts.length; i++) {
			if (parts[i].includes("*") || parts[i].includes("?")) break;
			baseDir = parts.slice(0, i + 1).join("/");
		}

		if (!existsSync(baseDir)) continue;

		const matcher = picomatch(pattern);
		const entries = readdirSync(baseDir, {
			recursive: true,
			withFileTypes: true,
		});

		for (const entry of entries) {
			if (!entry.isFile()) continue;
			const fullPath = join(entry.parentPath, entry.name).replace(/\\/g, "/");
			if (matcher(fullPath)) result.push(fullPath);
		}
	}

	return result;
}
