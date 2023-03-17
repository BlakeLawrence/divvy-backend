const express = require("express");
const cors = require("cors");

// importing veryfi sdk and setting client variables
const Client = require("@veryfi/veryfi-sdk");
const client_id = process.env.ID;
const client_secret = process.env.SECRET;
const username = process.env.USER;
const api_key = process.env.KEY;

let my_client = new Client(client_id, client_secret, username, api_key);

//function that sends the restuarant receipt (invoice.jpg) to veryfi and
// then returns a json object with all the processed OCR data: used in the below app.get for front end's fetch request.
const verifyOCR = async () => {
  const response = await my_client.process_document("invoice.jpg");
  const data = await response;
  return data;
};

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// for front end to fetch veryfi receipt object
app.get("/", async (req, res) => {
  const result = await verifyOCR();
  res.json(result);
});

app.listen(port, () => {
  console.log(`⚡ App listening on port ${port} ⚡`);
});
