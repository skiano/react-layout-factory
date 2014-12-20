
/** @jsx React.DOM */

jest.dontMock('../lib/LayoutFactory');

var React = require('react/addons')
  , TestUtils = React.addons.TestUtils
  , LayoutFactory = require('../lib/LayoutFactory')
  ;

var Component, Wrapped;

describe('Layout Factory', function () {

  beforeEach(function () {

    FancyComponent = React.createClass({
      render: function () {
        return (<div>Component</div>);
      }
    });

  });

  it('should have a static method for adding layouts', function () {

    Wrapped = LayoutFactory(FancyComponent, {
      protectedLayoutProps: ['blockedProp']
    });

    Wrapped.addLayouts({
      a: { a: true },
      b: { b: true },
      c: { c: true }
    });

    // console.log(Wrapped.getLayouts());

    var test = React.renderToString((<Wrapped layout='c'/>));

    console.log(test);

  });

});