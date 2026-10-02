# pressure

A static site bundler that supports building SCSS, TypeScript, and HTML.

## Description

pressure is a tool for bundling static websites with built-in support for preprocessing SCSS,
compiling TypeScript using esbuild, and generating HTML using the @wxn0brp/falcon-frame framework.
It also offers optional JSX support via vhtml and a built-in module generation system.

## Installation

Get [ingr](https://github.com/wxn0brP/dotfiles) and run:

```bash
ingr pressure
```

Or run:

```bash
bunx @wxn0brp/ing i pressure
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
- JSX support with vhtml
- Built-in module generation
- Single-file bundling (inline JS and CSS into HTML)

## Configuration

You can configure `pressure` in two ways:

1.  **Via a config file:** Create a `pressure.json` file in the root of your project.
2.  **Via command-line arguments:** Pass them directly when you run the command.

Command-line arguments will always override the options specified in the config file.

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

| Option        | Type                | Description                                                    | Default                 |
| ------------- | ------------------- | -------------------------------------------------------------- | ----------------------- |
| `dir`         | `string`            | The output directory for the bundled files.                    | `"dist"`                |
| `entryPoints` | `string[]`          | An array of entry points for esbuild.                          | `["src/index.ts"]`      |
| `external`    | `string[]`          | An array of packages to be treated as external.                | `[]`                    |
| `html`        | `string[]`          | An array of HTML files to process.                             | `["public/index.html"]` |
| `htmlPath`    | `string`            | Path mapping for HTML files, e.g., `"public:dist"`.            | `"public:dist"`         |
| `assets`      | `string[]`          | An array of asset directories to copy.                         | `[]`                    |
| `singleFile`  | `boolean`           | Bundle everything into a single HTML file with inline JS/CSS.  | `false`                 |
| `minify`      | `boolean`           | Enable or disable minification of the output.                  | `true`                  |
| `split`       | `boolean`           | Enable or disable code splitting.                              | `true`                  |
| `jsx`         | `boolean`           | Enable JSX support with vhtml.                                 | `false`                 |
| `gen`         | `boolean \| string` | Enable built-in module generation                              | `false`                 |
| `bannedFiles` | `string[]`          | Files to exclude from built-in module generation.              | `["self", "index"]`     |

### Command-Line Arguments

See [help](./src/help.ts) for more information.

### Additional Files

- `pressure/html.ts` or `pressure/html.json` can be used to configure the HTML data.
- `pressure/vars.json` can be used to configure falcon frame variables (e.g. layout).

## GitHub Action

pressure provides a GitHub Action for CI/CD. It builds your project and optionally uploads the output to GitHub Pages.

```yaml
- uses: wxn0brP/pressure@master
  with:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    # Additional CLI arguments
    args: ""              # Additional CLI arguments
    upload: true          # Upload to GitHub Pages
    pre: ""               # Command to run before building
    post: ""              # Command to run after building
    checkout: true        # Checkout the repository
```

## VSCode JSON Schema

```json
"json.schemas": [
    {
        "fileMatch": [
            "pressure.json"
        ],
        "url": "https://raw.githubusercontent.com/wxn0brP/pressure/refs/heads/master/pressure.schema.json"
    }
],
```

## License

MIT License
