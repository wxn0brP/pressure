#!/usr/bin/env bun

import { existsSync, mkdirSync } from "node:fs";
import { copyAssets } from "./assets";
import { buildCode } from "./esbuild";
import { buildHTML } from "./html";
import { config } from "./opts";

if (!existsSync(config.dir))
    mkdirSync(config.dir, { recursive: true });

await buildCode(config);
await buildHTML(config);
await copyAssets(config);

console.log("[PRESSURE] Build Done");
