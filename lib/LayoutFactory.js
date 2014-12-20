
/** @jsx React.DOM */

var React = require('react');

module.exports = function wrapComponent (Component, options) {

  options = options || {
    protectedLayoutProps: []
  };

  return new LayoutComponent(Component, options);

}

function LayoutComponent (Component, options) {

  var layouts = {}
    , layoutNames = []
    ;

  function expandProps (props) {
    props.extra = true;
  }

  return React.createClass({

    statics: {
      addLayouts: function () {},
      getLayouts: function () {},
      hasLayout: function () {},
      setDefaultLayout: function () {}
    },

    componentWillMount: function () {
      expandProps(this.props);
    },

    componentWillRecieveProps: function (newProps) {
      expandProps(newProps);
    },

    render: function () {
      return React.createElement(Component, this.props);
    }

  });

}