var plaid = require('plaid');
var secret = require('../../config');
module.exports = new plaid.Client(secret.clientId, secret.secret, secret.env);
