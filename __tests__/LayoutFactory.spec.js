
/** @jsx React.DOM */

jest.dontMock('../lib/LayoutFactory');

var React = require('react/addons')
  , TestUtils = React.addons.TestUtils
  , LayoutFactory = require('../lib/LayoutFactory')
  ;

var Wrapped;

var FancyComponent = React.createClass({
  render: function () {
    return (<div>Component</div>);
  }
});

describe('Layout Factory Statics', function () {

  it('should have a support getting layouts', function () {

    Wrapped = LayoutFactory(FancyComponent);

    expect(Wrapped.getLayouts()).toEqual([]);

  });

  it('should have a support adding layouts', function () {

    Wrapped = LayoutFactory(FancyComponent);

    Wrapped.addLayouts({
      a: { a: true },
      b: { b: true },
      c: { c: true }
    });

    expect(Wrapped.getLayouts()).toEqual(['a','b','c']);

  });

  it('should have a static method for adding a single layout', function () {

    Wrapped = LayoutFactory(FancyComponent);

    Wrapped.addLayout('f', {})

    expect(Wrapped.getLayouts()).toEqual(['f']);

  });

  it('should have a static methods for checking layout support', function () {

    Wrapped = LayoutFactory(FancyComponent);

    Wrapped.addLayout('f', {})

    expect(Wrapped.hasLayout('f')).toEqual(true);
    expect(Wrapped.hasLayout('g')).toEqual(false);

  });

});

describe('Display name', function () {
  
  it('should copy the display name of the component it wraps', function () {

    Wrapped = LayoutFactory(FancyComponent);

    expect(Wrapped.displayName).toEqual(FancyComponent.displayName);

  });

});

describe('Error handline', function () {
  
  it('should throw an error if `addLayouts` is misused', function () {

    Wrapped = LayoutFactory(FancyComponent, {
      protectedLayoutProps: ['blockedProp']
    });

    // you cannot add array

    expect(function () {
      Wrapped.addLayouts([{a:1}])
    }).toThrow();

    // layout keys must have an object

    expect(function () {
      Wrapped.addLayouts({
        a: 1
      })
    }).toThrow();

    expect(function () {
      Wrapped.addLayouts({
        a: []
      })
    }).toThrow();

    expect(function () {
      Wrapped.addLayouts({
        a: null
      })
    }).toThrow();

  });

  it('should throw an error if `addLayouts` is misused', function () {

    Wrapped = LayoutFactory(FancyComponent, {
      protectedLayoutProps: ['blockedProp']
    });

    expect(function () {
      Wrapped.addLayout(null, {})
    }).toThrow();

    expect(function () {
      Wrapped.addLayout(2, {})
    }).toThrow();

    expect(function () {
      Wrapped.addLayout('hi')
    }).toThrow();

  });

});


// it('should do another thing', function () {

//   Wrapped = LayoutFactory(FancyComponent);

//   Wrapped.addLayouts({
//     a: { a: true }
//   });

//   var test = React.renderToString((<Wrapped layout='a'/>));

//   console.log(test);

// });

