'use strict'

/**@type import('@adonisjs/lucid');*/
const User = use('App/Models/User');

class UserController {
    async login({ request, auth, view, response }) {
        const { username, password } = request.all();
        const { curl } = request.get();
        let curUsr = await auth.attempt(username, password);
        if (curl) {
            return response.redirect(curl);
        } else {
            return view.render('dashs.client', { user: usr });
        }
    }
    async store({ request, view }) {
        const u = request.only([
            'email',
            'username',
            'name',
            'password'
        ]);
        const user = User.create(u);
        return view.render('dashs.admin', { user: user });
    }
}

module.exports = UserController
