'use strict'
const Drive = use('Drive');
const Helpers = use('Helpers');
const fs = use('fs');

class FileController {
    async sitePhoto({ response, params }) {
        response.implicitEnd = false;
        let _file_ = Helpers.publicPath('image/' + params.name);
        if (!fs.existsSync(_file_)) {
            return response.status(404).json({ msg: '404 | Not Found', error: true });
        }
        const stream = await Drive.getStream(_file_);
        stream.on('end', cnk => response.send(cnk));
        stream.pipe(response.response);
    }
    async dogsPhoto({ response, params }) {
        response.inplicitEnd = false;
        let _file_;
        if (!fs.existsSync(_file_))
            return response.status(404).json({ msg: '404 | NotFound', error: true });
        const stream = await Drive.getStream(_file_);
        stream.on('end', cnk => { });
    }
}

module.exports = FileController
