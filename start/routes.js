'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.on('/').render('welcome');
Route.on('/login').render('auth.login', { t: 'Login' });
Route.on('/register').render('auth.register', { t: 'Register' });
Route.on('/app').render('dashs.client');

Route.post('/login', 'UserController.login');

// Auth WEB
Route.group(function () {
    Route.get('/chats', async () => { return render('dashs.client') });
    Route.on('/contacts', async () => { return render('dashs.client') });
    Route.on('/profile/:id?', 'UserController.profile');
    Route.get('/search', 'UserController.find');
}).middleware(['auth'])

//API
Route.group(function () {
    Route.post('login', 'UserController.login');
    Route.post('register', 'UserController.store');
}).prefix('api');

//Auth API
Route.group(function () {

}).prefix('api').middleware('auth');

// IMAGE Route

Route.get('/img/:name', 'FileController.chatPhoto');
