const STRIPE_SECRET_KEY = "sk_test_LHISgDp71IuPEWP53riys49f003qGhewue";

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

app.use(bodyParser.json());

app.get("/api/stripe-public-key", (req, res) => {
	res.send({ publicKey: STRIPE_PUBLISHABLE_KEY });
});

app.post("/api/create-payment-intent", async (req, res) => {
	const options = req.body;
	console.log(options);

	try {
		const paymentIntent = await stripe.paymentIntents.create(options);
		res.json(paymentIntent);
	} catch (err) {
		res.json(err);
	}
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
