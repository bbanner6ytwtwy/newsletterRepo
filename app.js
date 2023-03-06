
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const app = express();
const port = 5000;

const apiKey = process.env.API_KEY;
console.log(apiKey);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.post("/", (req, res) => {
    const fname = req.body.Fname;
    const lname = req.body.Lname;
    const email = req.body.email;
    const password = req.body.password;
    const listId = 'da1f50fc17';
    const url = `https://us21.api.mailchimp.com/3.0/lists/${listId}/members`;
    const subscriber = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
            FNAME: fname,
            LNAME: lname
        }
    };
    async function addSubscriber() {
        try {
            const response = await axios.post(url, subscriber, {
                auth: {
                    username: 'apikey',
                    password: apiKey
                }
            });
            console.log(response.status);
            console.log(response.data);
            if (response.status === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        } catch (error) {
            console.error(error.response.data);
        }
    }
    addSubscriber();
});
app.listen(process.env.PORT || port, () => (console.log("cow.......")));
