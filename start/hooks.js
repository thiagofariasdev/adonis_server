const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
    const View = use('View');
    View.global('title', (and) => { return process.env.APP_NAME + (and ? ' | ' + and : '') });
    View.global('image', (name) => { return process.env.APP_URL + '/images/' + name });
    View.global('app', {
        name: process.env.APP_NAME,
        versionNumber: process.env.APP_VERSION_NUM,
        versionCode: process.env.APP_VERSION_CODE,
        url: process.env.APP_URL,
    });
});