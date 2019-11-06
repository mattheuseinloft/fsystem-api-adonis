'use strict'

const Route = use('Route');

Route.post('/users', 'UserController.create');
Route.post('/sessions', 'SessionController.create');

Route.resource('questions', 'QuestionController')
  .apiOnly()
  .middleware('auth')
;

Route.post('/users/reset-password', 'PasswordController.store')
  .middleware('auth')
;
