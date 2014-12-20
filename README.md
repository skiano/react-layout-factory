
## React Layout Factory

Specifying options on a react component can help produce very flexible and reusable code, but as options become more complicated or plentiful, the permutations and variations of options can grow beyond what makes sense for a design.

This module attempts alleviate that prblem by providing a way to create __named Layouts__ for a component, which represend specific uses of any set of properties you want to limit. This way you can limit the use of a component in a specific context without destroying its potential flexibility.

For example, imagine you had something like the folowing:

    var AnyShapeComponent = React.createClass({

      propTypes: {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        message: React.PropTypes.string
      },

      render: function () {
        return React.createElement('div', {
          children: this.props.message
          style: {
            height: this.props.height,
            width: this.props.width,
          }
        });
      }

    });
    
    var myElement = React.createElement(AnyShapeComponent, {
      message: 'I can do any width and height',
      width: 331,
      height: 901
    });
    

Now, this obviously flexible, but if you want to use this component in a visual system, you might want to limit its use to a specific set of shapes, for instance ``large``, ``medium``, and `small`.

With ``react-layout-factory``, you can eaisily specify these shapes as layouts, and you get back a new component that translates the layout names into the specific options you need.

    var SpecificShapesComponent = layoutFactory(AnyShapeComponent);
    
    SpecificShapesComponent.addLayouts({
      large: {width: 1200, height: 800},
      medium: {width: 900, height: 600},
      small: {width: 600, height: 400}
    });
    
    var myElement = React.createElement(SpecificShapesComponent, {
      message: 'I can use a set of known widths',
      layout: 'medium'
    });
    
     // returns AnyShapeComponent that is 600 x 900
    
By approaching it this way, you have a way to turn a very generic component into a highly configurable one




