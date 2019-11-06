'use strict'

const Question = use('App/Models/Question');

class QuestionController {
  async index ({ response }) {
    const questions = await Question
      .query()
      .select('id', 'user_id', 'title', 'description')
      .with('creator', creatorQuery => {
        creatorQuery.select('id', 'username', 'email');
      })
      .fetch()
    ;

    return questions;
  }

  async store ({ auth, request, response }) {
    const { id } = auth.user;
    const data = request.only([
      'title',
      'description',
      'expiration_date'
    ])

    const question = await Question.create({ ...data, user_id: id });

    return question;
  }

  async show ({ params }) {
    const question = await Question.findOrFail(params.id);

    return question;
  }

  async update ({ params, request, response }) {
    const question = await Question.findOrFail(params.id);

    const data = request.only([
      'title',
      'description',
      'expiration_date'
    ]);

    question.merge(data);

    await question.save();

    return question;
  }

  async destroy ({ params, auth, response }) {
    const question = await Question.findOrFail(params.id);

    if (question.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' });
    }

    await question.delete();
  }
}

module.exports = QuestionController
