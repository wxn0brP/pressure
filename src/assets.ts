import { $ } from "bun";
import { Config } from "./opts";

export async function copyAssets(config: Config) {
    const { assets } = config;
    if (!assets.length) return console.log("[PRESSURE] No assets found");

    for (const file of assets) {
        await $`cp ${file} dist`;
    }
}