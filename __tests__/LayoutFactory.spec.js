
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
  
  it('should throw an error if `addLayouts()` is misused', function () {

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
        a: null
      })
    }).toThrow();

  });

  it('should throw an error if `addLayout()` is misused', function () {

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

  it('should expand the layout to props for the component', function () {

    Wrapped = LayoutFactory(FancyComponent);

    Wrapped.addLayout('a', { a: true, other: 3 });

    var test = TestUtils.renderIntoDocument((<Wrapped layout='a' myProp='test'/>));
    var rendered = TestUtils.findRenderedComponentWithType(test, FancyComponent);

    expect(rendered.props).toEqual({
      myProp: 'test',
      a: true,
      other: 3
    });

  });

  it('should prefer a user prop to the layout prop if the prop is not blocked', function () {

    Wrapped = LayoutFactory(FancyComponent);

    Wrapped.addLayout('a', { a: true, other: 3 });

    var test = TestUtils.renderIntoDocument((<Wrapped layout='a' other={1} a='override'/>));
    var rendered = TestUtils.findRenderedComponentWithType(test, FancyComponent);

    expect(rendered.props).toEqual({
      a: 'override',
      other: 1
    });

  });

  it('should support restricint props to the layout', function () {

    Wrapped = LayoutFactory(FancyComponent, {
      protectedLayoutProps: ['a', 'other']
    });

    Wrapped.addLayout('a', { a: true, other: 3 });

    var test = TestUtils.renderIntoDocument((<Wrapped layout='a' other={1} a='override'/>));
    var rendered = TestUtils.findRenderedComponentWithType(test, FancyComponent);

    expect(rendered.props).toEqual({
      a: true,
      other: 3
    });

  });

  it('should support `smart` layouts', function () {

    var smartLayout = jest.genMockFn().mockImpl(function (props) {
      return props.useLayout;
    });

    Wrapped = LayoutFactory(FancyComponent);

    Wrapped.addLayout('a', { a: true});
    Wrapped.addLayout('b', { b: true});
    Wrapped.addLayout('smart', smartLayout);

    var test = TestUtils.renderIntoDocument((<Wrapped layout='smart' useLayout='a'/>));
    var rendered = TestUtils.findRenderedComponentWithType(test, FancyComponent);

    expect(rendered.props).toEqual({
      a: true,
      useLayout: 'a'
    });

    var test = TestUtils.renderIntoDocument((<Wrapped layout='smart' useLayout='b'/>));
    var rendered = TestUtils.findRenderedComponentWithType(test, FancyComponent);

    expect(rendered.props).toEqual({
      b: true,
      useLayout: 'b'
    });

  });

  it('should pass the props through if layout is missing', function () {

    Wrapped = LayoutFactory(FancyComponent);

    var test = TestUtils.renderIntoDocument((<Wrapped myProp='cool'/>));
    var rendered = TestUtils.findRenderedComponentWithType(test, FancyComponent);

    expect(rendered.props).toEqual({
      myProp: 'cool'
    });

  });

  it('should pass the props through if smart layout returns missing layout', function () {

    Wrapped = LayoutFactory(FancyComponent);

    Wrapped.addLayout('smart', function (props) {
      return 'nonExistant';
    });

    var test = TestUtils.renderIntoDocument((<Wrapped layout='smart' myProp='cool'/>));
    var rendered = TestUtils.findRenderedComponentWithType(test, FancyComponent);
    
    expect(rendered.props).toEqual({
      myProp: 'cool',
      layout: 'smart'
    });

  });


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

