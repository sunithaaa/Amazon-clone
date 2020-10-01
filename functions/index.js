const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { request, response } = require('express');
const stripe = require("stripe")
('sk_test_51HTjrUGNLaaCsf3K8cAIVrhU8jW9gF7JkkHTPusetis0htUcrQubYbtGfkA5H1qUElCkk3Qssur5DwjAOTRm8Hh100djzjNEMX')
//API

//app config
const app = express();


//Middlewares
app.use(cors({origin : true}));
app.use(express.json());

//API routes
app.get("/",(request,response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request,response) => {
    const total = request.query.total;
    console.log('Payment request received>>>> ', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits
        currency: "usd",
    });
    // OK response status
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//listen command
exports.api = functions.https.onRequest(app);

//example end-point
//http://localhost:5001/clone-3b84b/us-central1/api


















