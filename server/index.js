var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var plaidClient = require('./lib/plaidClient');

// static files first
app.use(express.static('client'));

// parse json body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes
app.post('/plaid-connect', function (req, _res) {
  var public_token = req.body.public_token;
  var account_id = req.body.account_id;

  // Exchange a public_token for a Plaid access_token
  plaidClient.exchangeToken(public_token, function(err, res) {
    if (err != null) {
      throw new Error('plaidClient.exchangeToken:\n' + JSON.stringify(err));
    } else {
      // This is your Plaid access token - store somewhere persistent
      // The access_token can be used to make Plaid API calls to
      // retrieve accounts and transactions
      var accessToken = res.access_token;

      plaidClient.getConnectUser(accessToken, {account: account_id}, function(err, res) {
        if (err != null) {
          throw new Error('plaidClient.getConnectUser:\n' + JSON.stringify(err));
        } else {
          _res.json(res);
        }
      });
    }
  });
});

// port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
