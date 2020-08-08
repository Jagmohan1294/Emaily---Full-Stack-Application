import React from 'react'
import {connect} from 'react-redux'
import actionDispatcher from '../actions'
import StripeCheckout from 'react-stripe-checkout'

const Payments =(props)=>{
  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 email credits"
      amount={500}
      token={token => props.handleStripeToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button style={{background:'lightcoral'}} className="btn">Add Credits</button>
    </StripeCheckout>
  )
}
const mapDispatchToProps={
handleStripeToken: actionDispatcher.handleStripeToken
}

export default connect(null, mapDispatchToProps)(Payments)
