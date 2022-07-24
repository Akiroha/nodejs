const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // fetch data from body
    const { title, subject, body, recipients } = req.body;

    // create new survey object
    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    try {
      // send email
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();

      // save survey
      await survey.save();

      // decrement user
      req.user.credits -= 1;
      const user = await req.user.save();

      // send user back
      res.send(user);
    } catch (error) {
      res.status(422).send(err);
    }
  });
};
