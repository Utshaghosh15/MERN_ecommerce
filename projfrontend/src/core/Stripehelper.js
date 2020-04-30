import React, {useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/carthelper';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { API } from '../backend';


 const Stripehelper = ({products, 
                       setReload = f => f, 
                       reload = undefined}) => {
    
    const [data, setData] = useState({
      loading: false,
      success: false,
      error: "",
      address: ""  
    });
    
    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = () => {
       let amount = 0;

       products.map(p => {
         amount = amount + p.price  
       })
       return amount;
    };

    const makePayment = token => {
      const body = {
        token,
        products
      }
      const headers = {
        "Content-Type":"application/json"
      }
      return fetch(`${API}/stripepayment`, {
        method:"POST",
        headers,
        body: JSON.stringify(body)
      }).then(response => {
        console.log(response)
      })
      .catch(error => console.log(error)) 
    }

    const showStripeButton = () => {
      return isAuthenticated() ? (
        <StripeCheckout
         stripeKey="pk_test_JpikTkEZM7pv0kbneoki4yWp00ud9FIZ0x"
         token={makePayment}
         amount={getFinalPrice() * 100}
         name="Buy Tshirts"
         shippingAddress
         billingAddress
        >
         <button className="btn btn-success">Pay with Stripe</button>
       </StripeCheckout> 
       ) : (
         <Link to="/signin">
          <button className="btn btn-warning">Signin</button>
         </Link> 
      ) 
    }
    
    return (
        <div>
            <h3 className="text-white">Stripe Checkout loaded {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default Stripehelper;