import esbuild from "esbuild";
import stylePlugin from "esbuild-style-plugin";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Config } from "./opts";

export async function buildCode(config: Config) {
	const { entryPoints, dir, external, singleFile, minify, jsx } = config;
	if (!entryPoints.length)
		return console.log("[PRESSURE] No entryPoints found");

	const buildOptions: esbuild.BuildOptions = {
		entryPoints,
		outdir: dir,
		format: "esm",
		target: "es2022",
		bundle: true,
		sourcemap: true,
		external,
		splitting: !singleFile,
		minify,
		metafile: true,
		plugins: [
			stylePlugin({
				renderOptions: {
					sassOptions: {
						silenceDeprecations: [
							"legacy-js-api",
						],
						style: "compressed",
					},
				},
			}),
		],
	};

	if (jsx) {
		const shimPath = join(
			dirname(fileURLToPath(import.meta.url)),
			"..",
			"vhtml-shim.js",
		);
		buildOptions.jsxFactory = "h";
		buildOptions.jsxFragment = "h";
		buildOptions.inject = [
			shimPath,
		];
	}

	const result = await esbuild.build(buildOptions);

	console.log("[PRESSURE] entryPoints built", entryPoints);
	return result.metafile;
}
