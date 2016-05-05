var plaid = require('plaid');

try {
  var secret = require('./config.secret');
} catch (e) {
  var secret = {};
}

var config = Object.assign({
  env: plaid.environments.tartan,
  clientId: 'test_id',
  secret: 'test_secret',
  publicKey: 'test_key'
}, secret);

module.exports = config;
