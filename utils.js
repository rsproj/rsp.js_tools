#!/bin/env rsp.nodexf

const os = require('os');
const path = require('path');

function getPathHere() {
    return path.resolve(process.cwd());
}

function checkRoot() {
    if (os.userInfo().uid !== 0) {
        console.log('\n  * This script requires root privileges to run.');
        console.log('  * Rerunning the script with sudo...');
        const { spawn } = require('child_process');
        spawn('sudo', [process.argv[1], ...process.argv.slice(2)], { stdio: 'inherit' });
        process.exit();
    }
}

function printHeader(message) {
    console.log(`\n    ⇀  ${message}\n`);
    setTimeout(() => {}, 1000);
}

module.exports = {
    checkRoot,
    getPathHere,
    printHeader
}