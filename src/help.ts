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
    -a, --assets      Assets
`;

console.log(help.trim());