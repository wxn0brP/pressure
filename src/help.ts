export {};

const help = `
Usage: pressure [options]

Options:
    -h, --help        Show this help message
    -v, --version     Show version number
    -d, --dir         Output directory
    -s, --entry       Entry points
    -e, --external    External dependencies
    -i, --html        HTML files
    --hp              HTML output path
    -a, --assets      Assets
    --workflow        Write dir to file for workflow
    --single-file     Bundle everything into a single HTML file
    --no-minify       Disable minification
    --jsx             Enable JSX support with vhtml
    -g, --gen         Enable built-in gen (true) or path to custom script
    --banned-files    Files to exclude from gen (comma-separated)
`;

console.log(help.trim());
