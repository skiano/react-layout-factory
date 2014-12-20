
/** @jsx React.DOM */

var _ = require('lodash')
  , React = require('react')
  ;

function LayoutComponent (Component, options) {

  var layouts = {}
    , layoutNames = []
    ;

  function expandProps (props) {
    
    if (layouts.length === 0 || !_.has(layouts, props.layout)) {
      return props;
    } 

    var layoutProps = layouts[props.layout].props;

    if (_.isFunction(layoutProps)) {
      var smartLayout = layoutProps(props);
      layoutProps = layouts[smartLayout] ? layouts[smartLayout].props : null;
      props.layout = smartLayout;
      if (!layoutProps) { return props; }
    }

    if (_.isArray(options.protectedLayoutProps)) {
      _.each(options.protectedLayoutProps, function (propName) {
        // if the user wants to make sure
        // that a certain prop
        // must be handled by the layout
        delete(props[propName]);
      });
    }

    return _.extend({}, layoutProps, props);

  }

  function layoutError () {

    return new Error('Adding a bad layout to ' + Component.type.displayName);

  };

  return React.createClass({

    displayName: Component.displayName,

    statics: {
      
      addLayout: function (name, config) {

        if (!_.isString(name) || !_.isObject(config)) {
          throw layoutError();
        }

        // support user just passing in props

        if (!_.isPlainObject(config.props)) {
          config = {
            meta: {},
            props: config
          }
        }

        // make sure meta has name

        if (!_.isPlainObject(config.meta)) {
          config.meta = {name: name};
        } else {
          config.meta.name = name;
        }

        // store the layout

        layouts[name] = config;
        layoutNames.push(name);

      },

      addLayouts: function (newLayouts) {

        var self = this;
          
        _.each(newLayouts, function (value, key) {

          if (!_.isObject(value)) {
            throw layoutError();
          } else {
            self.addLayout(key, value);
          }

        });

      },

      getLayoutNames: function () {
        return layoutNames;
      },

      getLayouts: function () {
        return layouts;
      },

      getLayout: function (layout) {
        return layouts[layout];
      },

      hasLayout: function (layout) {
        return _.has(layouts, layout);
      }

    },

    propTypes: {
      layout: React.PropTypes.oneOf(layoutNames),
    },

    /*
     * Todo: 
     * are there other lifecycle methods
     * i need to worry about
     * ie: componentWillReceiveProps
     */

    componentWillMount: function () {
      this.props = expandProps(this.props);
    },

    componentWillReceiveProps: function (newProps) {
      _.extend(newProps, expandProps(newProps));
    },

    render: function () {
      return React.createElement(Component, this.props);
    }

  });

}

module.exports = function wrapComponent (Component, options) {

  options = _.extend({
    protectedLayoutProps: null
  }, options);

  return new LayoutComponent(Component, options);

}
