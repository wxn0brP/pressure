export { }

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
`;

console.log(help.trim());
