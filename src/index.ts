#!/usr/bin/env bun

import { copyAssets } from "./assets";
import { buildCode } from "./esbuild";
import { buildHTML } from "./html";
import { config } from "./opts";

await buildCode(config);
await buildHTML(config);
await copyAssets(config);

console.log("[PRESSURE] Build Done");