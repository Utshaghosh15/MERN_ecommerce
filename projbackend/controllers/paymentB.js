var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "fxqw6crhtb49fdvh",
  publicKey: "xxy79mr3xrrhhh6f",
  privateKey: "94a6308dba2de70d7d6350a0e6f80fca"   
});

exports.getToken = (req, res) => {
 gateway.clientToken.generate({}, function(err, response) {
     if(err) 
        res.send(500).send(err);
     else{
       res.send(response);     
    }
  });
}

exports.processPayment = (req, res) => {
  
  let nonceFormTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;  

   
  gateway.transaction.sale({
    amount: amountFromTheClient,
    paymentMethodNonce: nonceFormTheClient,
    options: {
      submitForSettlement: true
    }
    },
    function(err,result){
     if(err)
       res.status(500).json(err);
     else 
       res.json(result);      
  })  
}