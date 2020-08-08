const  Path  = require('path-parser')
const { URL } = require('url')
const _  = require('lodash')
const mongoose = require('mongoose')
const requireLogin  = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')


const Survey = mongoose.model('surveys')
module.exports = app => {

  app.get('/api/surveys', requireLogin, async (req, res) =>{
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false})

    res.send(surveys)
  })
  app.get('/api/surveys/:surveyId/:choice', (req, res)=>{
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/webhooks',(req, res)=>{
    const p = new Path('/api/surveys/:surveyId/:choice')
    const events = _.chain(req.body)
      .map( ({url, email}) => {
      const pathname = new URL(url).pathname
      const match = p.test(pathname)
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice}
      }
    }).filter(event => event)
      .uniqBy('email', 'surveyId')
      .each(({ email, surveyId, choice  })=> {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email, responded: false }
          }
        }, {
          $inc : {[choice]: 1},
          $set: {'recipients.$.responded': true},
          lastResponded: new Date()
        }).exec()
      })
      .value()
    console.log(events)

    res.send({})
  })

  app.post('/api/surveys', requireLogin, requireCredits,async (req, res)=>{
    const { title, subject, body, recipients } = req.body

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })
    //great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey))
    try {
    await mailer.send()
    await survey.save()
    req.user.credits -= 1
    const user = await req.user.save()

    res.send(user)
    } catch (err) {
      res.status(422).send(err)
    }
  })

  app.delete('/api/surveys/:surveyId/:userId',requireLogin ,async (req, res)=>{
    const { surveyId, userId } = req.params
    console.log(req.params)
    await Survey.deleteOne({ _id: surveyId, _user: userId })
    console.log("deleted")
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false})
    res.send(surveys)
  })
}