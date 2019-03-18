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
const Route = use('Route')
const c_msg = [];

Route.on('/').render('welcome');
Route.on('/login').render('login');
Route.on('/register').render('register');
Route.on('/app').render('app');

// Auth WEB
Route.group(function () {
    Route.get('/chats', async () => { return render('app') });
    Route.on('/contacts', async () => { return render('app') });
    Route.on('/profile/:id?', 'UserController.profile');
    Route.get('/search', 'DataController.find');
}).middleware(['auth'])

//API
Route.group(function () {
    Route.post('login', 'UserController.login');
    Route.post('register', 'UserController.store');
    Route.get('/send-message', ({ response }) => {
        c_msg.push('Hello\n\n');
        response.send('OK: ' + c_msg);
    })
    Route.get('/messages', ({ response }) => {
        response.header('Content-type', 'text/event-stream');
        response.send(c_msg);
    })
}).prefix('api');

//Auth API
Route.group(function () {

}).prefix('api').middleware('auth');
