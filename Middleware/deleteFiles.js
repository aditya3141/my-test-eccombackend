const fs = require('fs');
const path = require('path');

const deleteFiles = (filePaths) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(filePaths)) {
            return reject(new TypeError('filePaths should be an array'));
        }

        let errors = [];
        let pendingDeletes = filePaths.length;

        if (pendingDeletes === 0) {
            return resolve();
        }

        filePaths.forEach((filePath) => {
            fs.unlink(path.resolve(filePath), (err) => {
                if (err) {
                    errors.push(err);
                }
                pendingDeletes--;
                if (pendingDeletes === 0) {
                    if (errors.length > 0) {
                        reject(errors);
                    } else {
                        resolve();
                    }
                }
            });
        });
    });
};

module.exports = deleteFiles;
