import FalconFrame, { renderHTML } from "@wxn0brp/falcon-frame";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { Config } from "./opts";

const ff = new FalconFrame();

export async function buildHTML(config: Config) {
    const {
        html: files,
        htmlPath
    } = config;
    if (!files.length) return console.log("[PRESSURE] No HTML files found");

    const [from, to] = htmlPath.split(":");

    let htmlVars: Record<string, any> = {};

    if (existsSync("pressure/html.json"))
        Object.assign(htmlVars, JSON.parse(readFileSync("pressure/html.json", "utf-8")));

    if (existsSync("pressure/html.ts"))
        Object.assign(htmlVars, await import(process.cwd() + "/pressure/html"));

    if (existsSync("pressure/vars.json")) {
        const ffVars: Record<string, any> = JSON.parse(readFileSync("pressure/vars.json", "utf-8"));
        for (const [key, value] of Object.entries(ffVars))
            ff.setVar(key as any, value as any);
    }

    for (const file of files) {
        const html = renderHTML(file, htmlVars, [], ff);
        const path = file.replace(from, to);
        writeFileSync(path, html);
    }
}
