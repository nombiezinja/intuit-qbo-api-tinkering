const ENV = process.env.NODE_ENV;
const port = 8080;

require('dotenv').config();
const express = require('express');
const app = express();
const request = require('request');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);

app.get('/', (req, res) => {
  res.send(req.query)
})

app.get("/oauth2redirect", (req, res) => {
  res.send("Hello it me")
})

app.get('/intuit', (req, res) => {
  request.post(`https://appcenter.intuit.com/connect/oauth2`, {
    json: {
      client_id: ENV['CLIENT_ID'], 
      redirect_uri: "http://localhost:8080/oauth2redirect", 
      response_type: "code", 
      scope: "com.intuit.quickbooks.accounting", 
      state: ENV['STATE']
    },
    headers: {
      'Content-Type': 'application/json'
    }
  }, (err, response, body) => {
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