const fs = require('fs');
const util = require('util');
let { exec } = require('child_process');
exec = util.promisify(exec);
const argv = process.argv.slice(2);
const file = argv[0];
const mainDir = argv[1];


async function pdflatex() {
    const {stdout, stderr } = await exec(["pdflatex",
        "-interaction=nonstopmode", `${mainDir}/main.tex`].join(" "));
    console.log('stdout: ', stdout);
    console.error('stderr', stderr);
}
(async function main() {
    console.log(`watching for file changes on ${file}`);
    
    fs.watch(file, async (event, filename) => {
        try {
            if (filename) {
                await pdflatex();
            }
        } catch(e) {
            console.error(e)
        } finally {
            await main();
        }
    });
})()
