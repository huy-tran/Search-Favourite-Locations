var React = require('react');

var CurrentLocation = React.createClass({
  propTypes: {
    currentLocation: React.PropTypes.string.isRequired,
    isSaved: React.PropTypes.bool.isRequired,
    onFavouriteToggle: React.PropTypes.func.isRequired
  },
  render: function(){
    var className = this.props.isSaved ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty';
    return (
      <div className="col-md-8 col-md-offset-2 current-location text-center">
        <h4>{this.props.currentLocation}</h4>
        <span className={className} onClick={this.handleToggle} aria-hidden="true"></span>
      </div>
    );
  },
  handleToggle: function () {
    this.props.onFavouriteToggle(this.props.currentLocation);
  }
});

module.exports = CurrentLocation ;