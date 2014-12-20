
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

  it('should have a static method for adding layouts', function () {

    Wrapped = LayoutFactory(Component, {});

    Wrapped.addLayouts({
      a: {},
      b: {},
      c: {}
    });

    Wrapped.addLayouts([
      {
        meta: {name: 'd'},
        props: {}
      },{
        meta: {name: 'e'},
        props: {}
      },{
        meta: {name: 'f'},
        props: {}
      }
    ]);

    console.log(Wrapped.getLayouts());


    // var test = React.renderToString((<Wrapped/>));

    

  });

});