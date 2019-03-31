const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
    const View = use('View');
});