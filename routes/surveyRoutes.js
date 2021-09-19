const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const { URL } = require('url');
const { Path } = require('path-parser');
const { match } = require('assert');

const Survey = mongoose.model('surveys');
module.exports = (app) => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });
        res.send(surveys)
    })
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting')
    })
    app.post('/api/surveys/webhooks', (req, res) => {
        console.log(req.body);
        const events = req.body.filter(({ event }) => event === 'click').map(({ email, url }) => {
            const p = new Path("/api/surveys/:surveyId/:choice")
            const res = p.test(new URL(url).pathname);
            if (res) {
                return { email, ...res }
            }
        })
        events.forEach(({ email, surveyId, choice }) => {
            console.log(email, surveyId, choice);
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { email: email, responded: false }
                }
            }, {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }).exec();
        });
        res.send({});
    })
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body
        const survey = new Survey({
            title, subject, body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        })

        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user)
        } catch (err) {
            res.status(422).send(err);
        }

    })
}