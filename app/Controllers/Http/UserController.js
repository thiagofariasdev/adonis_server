'use strict'

const User = use('App/Models/User');

class UserController {
    async login({ request, auth, view }) {
        const { email, password } = request.all();
        let usr = await auth.attempt(email, password);
        return view.render('app', { user: usr });
    }
    async store({ request, view }) {
        const u = request.only([
            'email',
            'username',
            'name',
            'password'
        ]);
        const user = User.create(u);
        return user;
    }
}

module.exports = UserController
