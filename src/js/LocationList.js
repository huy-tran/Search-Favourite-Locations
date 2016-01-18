var React = require('react');
var LocationItem = require('./LocationItem');

var LocationList = React.createClass({
  propTypes: {
    favourites: React.PropTypes.array.isRequired,
    currentLocation: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  },
  render: function(){
    var locations = this.props.favourites.map(function (favourite, i) {
      var activeClass = this.props.currentLocation == favourite.address;
      return <LocationItem key={i} address={favourite.address} timestamp={favourite.timestamp} onClick={this.props.onClick} activeClass={activeClass}/>
    }.bind(this));
    if (!locations.length) {
      return null;
    }
    return (
      <div className="col-md-6 col-md-offset-3 list-group">
        <span className="list-group-item text-center">Saved Location</span>
        {locations}
      </div>
    );
  }
});

module.exports = LocationList ;