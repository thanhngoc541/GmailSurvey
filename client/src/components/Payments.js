import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions'
function Payments(props) {
  return (
    <StripeCheckout
      name="Emaily"
      description="5$ for 5 email credits"
      token={token => props.handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      amount={500}
    >
      <button className="btn"> Add credits</button>
    </StripeCheckout>
  )
}
export default connect(null, actions)(Payments)