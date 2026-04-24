import { renderHTML } from "@wxn0brp/falcon-frame";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { Config } from "./opts";

export async function buildHTML(config: Config) {
    const {
        html: files,
        htmlPath
    } = config;
    if (!files.length) return console.log("[PRESSURE] No HTML files found");

    let FFVar: Record<string, any> = {};
    const [from, to] = htmlPath.split(":");

    let data: Record<string, any> = {};

    if (existsSync("pressure/html.json"))
        Object.assign(data, JSON.parse(readFileSync("pressure/html.json", "utf-8")));

    if (existsSync("pressure/html.ts"))
        Object.assign(data, await import(process.cwd() + "/pressure/html"));

    if (existsSync("pressure/vars.json"))
        FFVar = JSON.parse(readFileSync("pressure/vars.json", "utf-8"));

    for (const file of files) {
        const html = renderHTML({
            templatePath: file,
            data,
            FFVar,
        });
        const path = file.replace(from, to);
        writeFileSync(path, html);
    }
}
