const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const ussd_menu = [{ text: "enter phone number" }, { text2: "enter amount" }];
//  parameters to be passed 
app.post("/", (req, res) => {
    let {
        command,
        msisdn,
        session_id,
        operator,
        payload: { request_id, response }
    } = req.body; // capturing http body data

    // generating response to the subcriber
    const request = ussd_menu[request_id].text
    command = request_id + 1 === ussd_menu.length ? "terminate" : "continue";

    // paforming tasks based on received 
    if (req.body.command === "terminate") {
        console.log("request is terminating soon");
    }
    if (req.body.command === "continue") {
        console.log("on progress ");
    }
    // respond with the passed data and other data
    res.json({
        msisdn,
        operator,
        session_id,
        command,
        payload: { request_id, request }
    });

});

app.listen(4000, () => {
    console.log("app running on port 4000");
});