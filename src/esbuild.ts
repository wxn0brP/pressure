import esbuild from "esbuild";
import stylePlugin from "esbuild-style-plugin";
import { Config } from "./opts";

export async function buildCode(config: Config) {
    const {
        entryPoints,
        dir,
        external,
    } = config;
    if (!entryPoints.length) return console.log("[PRESSURE] No entryPoints found");

    await esbuild.build({
        entryPoints,
        outdir: dir,
        format: "esm",
        target: "es2022",
        bundle: true,
        sourcemap: true,
        external,
        splitting: true,
        minify: true,
        plugins: [
            stylePlugin({
                renderOptions: {
                    sassOptions: {
                        silenceDeprecations: ["legacy-js-api"],
                        style: "compressed"
                    }
                }
            })
        ],
    });
}