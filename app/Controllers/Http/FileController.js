'use strict'
const Drive = use('Drive');

const file = './../logs/cmd_out.log';

class FileController {
    async chatPhoto({ response }) {
        response.implicitEnd = false;
        const stream = await Drive.getStream(file);
        stream.on('data', (cnk) => {
            response.send(cnk);
        });
    }
    async syncPhoto({ response }) {
        return await Drive.get(file);
    }
}

module.exports = FileController
