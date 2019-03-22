'use strict'
const Drive = use('Drive');

const file = './../public/image/bacon.jpg';

class FileController {
    async chatPhoto({ response }) {
        response.implicitEnd = false;
        const stream = await Drive.getStream(file);
        stream.on('data', (cnk) => {
            response.response.write(cnk);
        });
        stream.on('end', (cnk) => {
            response.send(cnk);
        })
    }
    async syncPhoto({ response }) {
        response.response.write(await Drive.get(file));
    }
}

module.exports = FileController
