var $script = require('scriptjs');

$script('https://cdn.plaid.com/link/stable/link-initialize.js', function () {
  var linkHandler = Plaid.create({
    env: 'tartan',
    clientName: 'Client Name',
    key: 'test_key',
    product: 'connect',
    longtail: true,
    selectAccount: true,

    onLoad: function() { // The Link module finished loading.
      // Trigger the standard institution select view
      var button = document.createElement("button");
      button.innerText = 'Open Link - Institution Select';
      document.body.appendChild(button);
      button.onclick = function() {
        linkHandler.open();
      };
    },

    onSuccess: function(__, metadata) {
      fetch('/plaid-connect', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(metadata)
      });
    },

    onExit: function() {
      // The user exited the Link flow.
    }
  });
});
