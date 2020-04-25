const express = require("express");
const serverless = require("serverless-http");
const router = express.Router();

const bodyParser = require("body-parser");
const app = express();

const onfleet = require("onfleet")("3120bf5ef9f9a0d16f036eef7b496609");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/api/create-task", async (req, res) => {
	await onfleet.tasks
		.create(
			req.body
			// destination: { address: { unparsed: "2829 Vallejo St, SF, CA, USA" }, notes: "Small green door by garage door has pin pad, enter *4821*" },
			// recipients: [{ name: "Blas Silkovich", phone: "+16505554481", notes: "Knows Neiman, VIP status." }],
			// completeAfter: 1455151071727,
			// notes: "Order 332: 24oz Stumptown Finca El Puente, 10 x Aji de Gallina Empanadas, 13-inch Lelenitas Tres Leches",
			// autoAssign: { mode: "distance" },
		)
		// await onfleet.recipients
		// 	.create({ name: "bbb", phone: "+1234567890", notes: "Always orders our GSC special", skipPhoneNumberValidation: true })
		.then((result) => {
			console.log(result);
			res.send({ status: 200, data: result });
		})
		.catch((err) => {
			console.log("error", err);
			res.send({ status: err.code, data: err });
		});
});

app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
