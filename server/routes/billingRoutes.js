const stripe = require('stripe')(require('../config/keys').stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res)=>{
    const charge =  await stripe.charges.create({
      amount: 500,
      currency: 'inr',
      description: 'Rs.5 for 5 credits',
      source: req.body.id
     })
 //    stripe.customers.create({
 //      email: req.body.email,
 //      card: req.body.id
 //    })
 //      .then(customer =>
 //        stripe.charges.create({
 //          amount:500,
 //          description: "Sample Charge",
 //          currency: "inr",
 //          customer: customer.id
 //        }))
 //      .then(charge => res.send(charge))
 //      .catch(err => {
 //        console.log("Error:", err);
 //        res.status(500).send({error: "Purchase Failed"});
 //      });

    req.user.credits +=5
    const user =  await req.user.save()
    res.send(user)
  })
}