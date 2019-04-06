'use strict'

const User = use('App/Models/User');

class ApiUserController {
    async login({ request, auth }) {
        const { email, password } = request.all();
        let usr = await auth.attempt(email, password);
        return usr;
    }
    async store({ request }) {
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

module.exports = ApiUserController
