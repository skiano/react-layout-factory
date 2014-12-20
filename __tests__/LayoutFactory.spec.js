
/** @jsx React.DOM */

jest.dontMock('../lib/LayoutFactory');

var React = require('react/addons')
  , TestUtils = React.addons.TestUtils
  , LayoutFactory = require('../lib/LayoutFactory')
  ;

var Component, Wrapped;

describe('Layout Factory', function () {

  beforeEach(function () {

    Component = React.createClass({
      render: function () {
        return (<div>Component</div>);
      }
    });

  });

  it('should work', function () {

    Wrapped = LayoutFactory(Component, {});
    
    var test = React.renderToString((<Wrapped/>));

    console.log(test);

  });

});