import { $ } from "bun";
import { Config } from "./opts";

export async function copyAssets(config: Config) {
    const { assets } = config;
    if (!assets.length) return console.log("[PRESSURE] No assets found");

    for (const file of assets) {
        if (process.platform === "win32")
            await $`copy ${file} dist`;
        else
            await $`cp ${file} dist`;
    }
}
