
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

    console.log(layoutProps);

    props.extra = true;

  }

  function layoutError () {

    return new Error('Adding a bad layout to ' + Component.type.displayName);

  };

  return React.createClass({

    displayName: Component.displayName,

    statics: {
      
      addLayout: function (name, config) {

        if (!_.isString(name) || !_.isPlainObject(config)) {
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

      getLayouts: function () {

        return layoutNames;

      },

      hasLayout: function (layout) {

        return _.has(layouts, layout);

      }

    },

    propTypes: {
      layout: React.PropTypes.oneOf(layoutNames),
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

module.exports = function wrapComponent (Component, options) {

  options = _.extend({
    protectedLayoutProps: []
  }, options);

  return new LayoutComponent(Component, options);

}
