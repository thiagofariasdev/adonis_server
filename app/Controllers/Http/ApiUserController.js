'use strict'
/**@type import('@adonisjs/lucid');*/
const User = use('App/Models/User');

class ApiUserController {
    async login({ request, auth }) {
        const { username, password } = request.all();
        let curUsr = await auth.attempt(username, password);
        let usr = await User.findBy('email', username);
        curUsr.user = usr;
        return curUsr;
    }
    async store({ request }) {
        const u = request.only([
            'email',
            'username',
            'name',
            'password'
        ]);
        const user = User.create(u);
        return { created: true, user: user };
    }
}

module.exports = ApiUserController
