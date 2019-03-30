'use strict'
const Drive = use('Drive');
const Helpers = use('Helpers');
const fs = use('fs');

class FileController {
    async chatPhoto({ response, params }) {
        response.implicitEnd = false;
        let _file_ = Helpers.publicPath('image/' + params.name);
        if (!fs.existsSync(_file_)) {
            return response.status(404).json({ msg: '404 | file name does not match', error: true });
        }
        const stream = await Drive.getStream(_file_);
        stream.on('data', (cnk) => {
            response.response.write(cnk);
        });
        stream.on('end', (cnk) => {
            response.send(cnk);
        })
    }
    async uploadPhoto({ response, request }) {

    }
}

module.exports = FileController
