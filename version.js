'use strict';

const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');

const execAsync = promisify(exec);

const server = "camelByte" // path.basename(__dirname);

var contentPromise = null;

// This is not used in production. Instead, the post-receive hook creates a static version.js.
module.exports = function (req, res) {
    let content = `window.server = "${server}";`
    if (contentPromise == null) {
        contentPromise = new Promise(function (resolve, reject) {
            getVersion().then(v => resolve(content + `window.version = "${v}";`));
        });
    }

    contentPromise.then(function (content) {
        res.set('Content-type', 'text/javascript');
        res.send(content)
    });
};

async function getVersion() {
    try {
        const { stdout } = await execAsync('git describe --tags --long', { cwd: __dirname });
        const version = stdout.replace(/[\r\n]/g, '');
        return version;
    } catch {
        try {
            const { stdout } = await execAsync('git rev-parse --short HEAD', { cwd: __dirname });
            const shortCommit = stdout.replace(/[\r\n]/g, '');
            return `commit ${shortCommit}`;
        } catch {
            return '';
        }
    }
}
