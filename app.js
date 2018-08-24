require('dotenv').config();

const ENV = process.env.ENV;
const port = 8080;

const express = require('express');
const app = express();
const request = require('request');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);

app.get('/', (req, res) => {
  res.send(req.query)
})

app.get("/oauth2redirect", (req, res) => {
  console.log("Hit")
  res.send("Hello it me")
})

app.get('/intuit', (req, res) => {
  console.log(process.env.STATE)
  request.get(`https://appcenter.intuit.com/connect/oauth2?client_id=L093aQ7XyGkCQP3gY3Ee9m7NRno0mhNa2ru184wX1m1qtpDxQO&redirect_uri=http%3A%2F%2Flocalhost%3A9090%2Foauth2redirect&response_type=code&scope=com.intuit.quickbooks.accounting&state=c8e8115b-fbd7-4782-8c4b-d01e2d049111`, {
    // json: {
    //   client_id:process.env.CLIENT_ID, 
    //   redirect_uri: "http://localhost:8080/oauth2redirect", 
    //   response_type: "code", 
    //   scope: "com.intuit.quickbooks.accounting", 
    //   state: process.env.STATE
    // },
    headers: {
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': 'http://localhost:8080/'
    }
  }, (err, response,
     body) => {
    if (err) {
      return console.log(err);
    }
    console.log(body);
    console.log(response.header)
    console.log(response.statusCode)
    console.log(response.statusMessage)
    res.send(response.body)
  });
})


app.listen(port, function () {
  console.log('Server working at http://localhost:' + port);
});