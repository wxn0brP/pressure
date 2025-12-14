# pressure

A static site bundler that supports building SCSS, TypeScript, and HTML.

## Description

pressure is a tool for bundling static websites with built-in support for preprocessing SCSS, compiling TypeScript using esbuild, and generating HTML using the @wxn0brp/falcon-frame framework.

## Installation

Get [ingr](https://github.com/wxn0brP/dotfiles) and run:

```bash
ingr pressure
```

## Basic Usage

```bash
pressure [options]
```

## Features

- TypeScript compilation via esbuild
- HTML generation via @wxn0brp/falcon-frame
- SCSS compilation via esbuild-style-plugin
- Static site bundling

## Configuration

You can configure `pressure` in two ways:

1.  **Via a `pressure.json` file:** Create this file in the root of your project.
2.  **Via command-line arguments:** Pass them directly when you run the command.

Command-line arguments will always override the options specified in `pressure.json`.

### `pressure.json`

Example `pressure.json`:

```json
{
    "html": [
        "public/index.html"
    ],
    "entryPoints": [
        "src/index.ts"
    ],
    "assets": [
        "public/favicon.ico"
    ]
}
```

| Option      | Type       | Description                                         | Default                 |
| :---------- | :--------- | :-------------------------------------------------- | :---------------------- |
| `dir`       | `string`   | The output directory for the bundled files.         | `"dist"`                |
| `entryPoints` | `string[]` | An array of entry points for esbuild.               | `["src/index.ts"]`      |
| `external`  | `string[]` | An array of packages to be treated as external.     | `[]`                    |
| `html`      | `string[]` | An array of HTML files to process.                  | `["public/index.html"]` |
| `htmlPath`  | `string`   | Path mapping for HTML files, e.g., `"public:dist"`. | `"public:dist"`         |
| `assets`    | `string[]` | An array of asset directories to copy.              | `[]`                    |

### Command-Line Arguments

| Argument            | Short      | Description                                       |
| :------------------ | :--------- | :------------------------------------------------ |
| `--dir <path>`      | `-d <path>`  | Sets the output directory.                        |
| `--entry <files>`   | `-s <files>` | Sets the entry points (comma-separated).          |
| `--external <pkgs>` | `-e <pkgs>`  | Sets external packages (comma-separated).         |
| `--html <files>`    | `-i <files>` | Sets the HTML files to process (comma-separated). |
| `--hp <path>`       |            | Sets the HTML path mapping (`source:dest`).       |
| `--assets <dirs>`   | `-a <dirs>`  | Sets asset directories to copy (comma-separated). |
| `--help`            | `-h`         | Displays the help message.                        |
| `--version`         | `-v`         | Displays the version number.                      |