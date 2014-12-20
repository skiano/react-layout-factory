
## React Layout Factory

Specifying options on a react component can help produce very flexible and reusable code, but as options become more complicated or plentiful, the permutations and variations of options can grow beyond what makes sense for a design.

This module attempts alleviate that prblem by providing a way to create __named Layouts__ for a component, which represend specific uses of any set of properties you want to limit. This way you can limit the use of a component in a specific context without destroying its potential flexibility.

For example, imagine you had something like the folowing (granted, a silly example)

    var InfiniteOptions = React.createClass({

      propTypes: {
        width: React.PropTypes.number,
        message: React.PropTypes.string
      },

      render: function () {
        return React.createElement('div', {
          children: this.props.message
          style: {
            width: this.props.width, // could be any height you want
          }
        });
      }

    });
    
    var myElement = React.createElement(InfiniteOptions, {
      message: 'I can do any width',
      width: 331
    });
    

Now, this is great in terms of flexibility, but if you want to use this component in a visual system, you might want to limit its use to a specific set of heights, for instance ``extrawide``, ``wide``, and `narrow`.

With ``react-layout-factory``, you can specify these layouts and assign them to specific values for the height property. This looks something like the following.

    var LimitedOptions = layoutFactory(InfiniteOptions);
    
    LimitedOptions.addLayouts({
      extrawide: {width: 1260},
      wide: {width: 720},
      narrow: {width: 300}
    });
    
    var myElement = React.createElement(InfiniteOptions, {
      message: 'I can use a set of known widths',
      layout: 'wide' // width will be 720
    });


