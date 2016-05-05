import React from 'react';
import $script from 'scriptjs';

class PlaidLinkButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getInitialState(props);
  }

  _getInitialState() {
    return {
      linkHandler: null
    };
  }

  render() {
    return (
      <button onClick={this._open.bind(this)}>Open Link - Institution Select</button>
    );
  }

  componentDidMount() {
    var _this = this;

    $script('https://cdn.plaid.com/link/stable/link-initialize.js', function () {
      var linkHandler = Plaid.create({
        env: 'tartan',
        clientName: 'Client Name',
        key: 'test_key',
        product: 'connect',
        longtail: true,
        selectAccount: true,

        onLoad: function() { // The Link module finished loading.
          _this.setState({linkHandler: linkHandler});
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

  }

  _open() {
    if (this.state.linkHandler) {
      this.state.linkHandler.open();
    }
  }

}

export default PlaidLinkButton;
