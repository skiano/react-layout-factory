
/** @jsx React.DOM */

var _ = require('lodash')
  , React = require('react')
  ;

module.exports = function wrapComponent (Component, options) {

  options = _.extend({
    protectedLayoutProps: []
  }, options);

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
      addLayout: function (meta, props) {

        if (_.isString(meta)) {
          meta = {
            name: meta
          }
        }

        if (_.isObject(meta) && _.isString(meta.name)) {

          layouts[meta.name] = {
            meta: meta,
            props: props || {}
          }

          layoutNames.push(meta.name);

        } else {

          throw new Error ('meta must be a string or object');

        }

      },
      addLayouts: function (newLayouts) {

        var self = this;

        if (_.isArray(newLayouts)) {

          _.each(newLayouts, function (value) {

            if (!_.isObject(value) || 
                !_.isObject(value.meta) || 
                !_.isObject(value.props) ||
                !_.has(value.meta, 'name')) {

              throw layoutError();

            } else {

              self.addLayout(value.meta, value.props);  

            }
            
          });

        } else if (_.isObject(newLayouts)) {
          
          _.each(newLayouts, function (value, key) {

            if (!_.isObject(value) || !_.isString(key)) {

              throw layoutError();

            } else {

              self.addLayout(key, value);

            }

          });

        }

      },
      getLayouts: function () {

        return layoutNames;

      },
      hasLayout: function () {

      },
      setDefaultLayout: function () {

      }
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

function layoutError () {
  return new Error('Attempting to make a bad layout');
};
