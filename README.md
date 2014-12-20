
## React Layout Factory

Specifying options on a react component can help produce very flexible and reusable code, but as options become more complicated or plentiful, the permutations and variations of options can grow beyond what makes sense for a design.

This module attempts to alleviate that prblem by providing a way to name certain sets of component options that you want to be reusable without having to restrict the flexibility of the core component.

For example, imagine you had something like the folowing (granted, it is a bit exaggerated)


    var InfiniteOptions = React.createClass({

      propTypes: {
        size: React.PropTypes.number
      },

      render: function () {
        return React.createElement('div', {
          style: {
            background: 'blue',
            height: this.props.height, // could be any height you want
            width: '100%'
          }
        });
      }

    });


Now, this is great in terms of flexibility, but if you want to use this component in a visual system, you might want to limit its use to a specific set of heights. At the same time you probably don't want to give up your awsome flexibility.

With ``react-layout-factory``, you can specify a set of layout names, such as 'tall', 'medium', and 'short', and specify how that translates to props for this component
