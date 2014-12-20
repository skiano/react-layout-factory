
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

describe('Component Statics', function () {

  it('should support statics.getLayouts()', function () {

    Wrapped = LayoutFactory(FancyComponent);

    expect(Wrapped.getLayouts()).toEqual({});

  });

  it('should support statics.getLayoutNames()', function () {

    Wrapped = LayoutFactory(FancyComponent);

    expect(Wrapped.getLayoutNames()).toEqual([]);

  });

  it('should support statics.addLayouts()', function () {

    Wrapped = LayoutFactory(FancyComponent);

    Wrapped.addLayouts({
      a: { a: true },
      b: { b: true },
      c: { c: true }
    });

    expect(Wrapped.getLayoutNames()).toEqual(['a','b','c']);
    expect(Wrapped.getLayouts()).toEqual({
      a: {
        meta: {name: 'a'},
        props: {a: true}
      },
      b: {
        meta: {name: 'b'},
        props: {b: true}
      },
      c: {
        meta: {name: 'c'},
        props: {c: true}
      }
    });

  });

  it('should support statics.addLayout()', function () {

    Wrapped = LayoutFactory(FancyComponent);

    Wrapped.addLayout('f', {})

    expect(Wrapped.getLayoutNames()).toEqual(['f']);

  });

  it('should support statics.hasLayout()', function () {

    Wrapped = LayoutFactory(FancyComponent);

    Wrapped.addLayout('f', {})

    expect(Wrapped.hasLayout('f')).toEqual(true);
    expect(Wrapped.hasLayout('g')).toEqual(false);

  });

  it('should support statics.getLayout()', function () {

    Wrapped = LayoutFactory(FancyComponent);

    var layout = {
      meta: {},
      props: {}
    }

    Wrapped.addLayout('f', layout);

    var f = Wrapped.getLayout('f');

    // make sure it still looks the smae
    expect(f).toEqual(layout);

    // make sure name is copied to layout.meta
    expect(f.meta.name).toEqual('f');

  });

});

describe('Component displayName', function () {
  
  it('should copy the display name of the component it wraps', function () {

    Wrapped = LayoutFactory(FancyComponent);

    expect(Wrapped.displayName).toEqual(FancyComponent.displayName);

  });

});

describe('Error handling', function () {
  
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

describe('Prop expansion', function () {

  // test how props get created from layouts

  // test protectedlayout props

});

describe('Component lifecycle', function () {

  // it('should do another thing', function () {

  //   Wrapped = LayoutFactory(FancyComponent);

  //   Wrapped.addLayouts({
  //     a: { a: true }
  //   });

  //   var test = React.renderToString((<Wrapped layout='a'/>));

  //   console.log(test);

  // });

});

