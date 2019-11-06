'use strict'

class PasswordController {
  async store({ auth, request }) {
    const { newPassword } = request.only([
      'newPassword'
    ]);

    return auth.user;
  }
}

module.exports = PasswordController
