var React = require('react');
var GMaps = require('gmaps');

var MapDisplay = React.createClass({
  propTypes: {
    lat : React.PropTypes.number.isRequired,
    lng : React.PropTypes.number.isRequired
  },
  componentDidMount: function(){
    this.componentDidUpdate();
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (this.lastLat == this.props.lat && this.lastLng == this.props.lng) {
      return;
    }
    this.lastLat = this.props.lat;
    this.lastLng = this.props.lng;
    var map =new GMaps({
      div: '#map',
      lat: this.props.lat,
      lng: this.props.lng,
      width: '100%',
      height: '500px',
      zoom: 14
    });
    map.addMarker({
      lat: this.props.lat,
      lng: this.props.lng,
    })
  },
  render: function(){
    return (
      <div className="col-md-8 col-md-offset-2">
        <div id="map"></div>
      </div>
    );
  }
});

module.exports = MapDisplay ;