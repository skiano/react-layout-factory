
/** @jsx React.DOM */

var React = require('react');

module.exports = function wrapComponent (component, options) {

  options = options || {
    protectedLayoutProps: []
  };

  return new LayoutComponent(component, options);

}

function Options (component, options) {
  
  // this.name = name;

  // var layouts = {}
  //   , layoutNames = []
  //   ;

  // this.addLayout = function (name, option) {
  //   layouts[name] = option;
  // };

  // this.getLayouts = function () {

  // }

}