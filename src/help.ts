export {};

const help = `
Usage: pressure [options]

General:
    -h, --help             Show this help message
    -v, --version          Show version number
    -f, --config-file      Config file

Input:
    -s, --entry            Entry points
    -e, --external         External dependencies
    -i, --html             HTML files
    --hp                   HTML output path
    -a, --assets           Assets

Output:
    -d, --dir              Output directory
    --workflow             Write dir to file for workflow
    --single-file          Bundle everything into a single HTML file

Build:
    --no-minify            Disable minification
    --no-split             Disable code splitting
    --jsx                  Enable JSX support with vhtml

Gen:
    -g, --gen              Enable built-in gen (true) or path to custom script
    --banned-files         Files to exclude from gen (comma-separated)
`;

console.log(help.trim());
