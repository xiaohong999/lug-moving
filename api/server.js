const STRIPE_SECRET_KEY = "sk_test_LHISgDp71IuPEWP53riys49f003qGhewue";

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const express = require("express");
const serverless = require("serverless-http");
const router = express.Router();

const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
router.post("/api/create-payment-intent", async (req, res) => {
	const options = req.body;
	console.log(options);

	try {
		const paymentIntent = await stripe.paymentIntents.create(options);
		res.json(paymentIntent);
	} catch (err) {
		res.json(err);
	}
});

app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
