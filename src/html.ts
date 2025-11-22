import { renderHTML } from "@wxn0brp/falcon-frame";
import { existsSync, writeFileSync } from "fs";
import { Config } from "./opts";

export async function buildHTML(config: Config) {
    const {
        html: files,
        htmlPath
    } = config;
    if (!files.length) return console.log("[PRESSURE] No HTML files found");

    const [f, t] = htmlPath.split(":");

    let vars: Record<string, any> = {};

    if (existsSync("html.ts")) {
        vars = await import(process.cwd() + "/html");
    }

    for (const file of files) {
        const html = renderHTML(file, vars);
        const path = file.replace(f, t);
        writeFileSync(path, html);
    }
}