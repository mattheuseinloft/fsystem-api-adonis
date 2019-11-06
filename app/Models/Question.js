'use strict'

const Model = use('Model')

class Question extends Model {
  creator () {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Question
