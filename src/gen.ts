import fs from "fs";
import path from "path";

function scanDir(dir: string, fileList: string[] = []) {
	const entries = fs.readdirSync(dir, {
		withFileTypes: true,
	});
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			scanDir(fullPath, fileList);
		} else if (
			entry.isFile() &&
			fullPath.endsWith(".ts") &&
			!fullPath.endsWith(".d.ts")
		) {
			fileList.push(fullPath);
		}
	}
	return fileList;
}

export function generateModules(
	srcDir: string,
	outFile: string,
	bannedFiles: string[],
) {
	const files = scanDir(srcDir);
	const imports: string[] = [];
	const exportEntries: string[] = [];

	files.forEach(file => {
		const relPath =
			"./" +
			path.relative(srcDir, file).replace(/\\/g, "/").replace(/\.ts$/, "");
		if (bannedFiles.some(b => relPath.startsWith("./" + b))) return;
		const modName = relPath
			.replace("./", "")
			.replaceAll("/", "_")
			.replace(".ts", "");

		imports.push(`import * as ${modName} from "${relPath}";`);
		exportEntries.push(modName);
	});

	const content = `${imports.join("\n")}
function register(path, file) {
	const parts = path.split("_");
	const last = parts.pop();
	let current = __mod;
	for (const part of parts) {
		if (!current[part]) current[part] = {};
		current = current[part];
	}
	current[last] = file;
}
export const __mod: any = {};
${exportEntries.map(e => `register("${e}", ${e});`).join("\n")}
(window as any).__mod = __mod;
`;

	fs.writeFileSync(outFile, content, "utf-8");
	console.log(`[PRESSURE] Generated ${imports.length} imports`);
}
