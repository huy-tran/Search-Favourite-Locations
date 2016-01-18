var React = require('react');
var ReactDOM = require('react-dom');
var GMaps = require('gmaps');
var Search = require('./Search');
var MapDisplay = require('./MapDisplay');
var CurrentLocation = require('./CurrentLocation');
var LocationList = require('./LocationList');

var App = React.createClass({
  getInitialState: function(){
    var favourites = [];
    if (localStorage.favourites) {
      favourites = JSON.parse(localStorage.favourites);
    }
    return {
      favourites: favourites,
      currentAddress: 'Brisbane, Australia',
      mapCoordinates: {
        lat: -27.4702793,
        lng: 153.0142812
      }
    };
  },
  render: function(){
    return (
      <div className="container">
        <Search onSearch={this.searchAddress} />
        <MapDisplay lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />
        <CurrentLocation currentLocation={this.state.currentAddress}
          isSaved={this.isSaved(this.state.currentAddress)}
          onFavouriteToggle={this.favouriteToggle} />
        <LocationList favourites={this.state.favourites} 
          currentLocation={this.state.currentAddress}
          onClick={this.searchAddress} />
      </div>
    );
  },
  searchAddress: function (address) {
    GMaps.geocode({
      address: address,
      callback: function (results, status) {
        if (status !== 'OK') return;
        var latlng = results[0].geometry.location;
        this.setState({ 
          currentAddress: results[0].formatted_address,
          mapCoordinates: {
            lat: latlng.lat(),
            lng: latlng.lng()
          }
        });
      }.bind(this)
    });
  },
  isSaved: function (address) {
    var favourites = this.state.favourites;
    for (var i = 0; i < favourites.length; i++) {
      if (favourites[i].address == address) {
        return true;
      }
    }
    return false;
  },
  favouriteToggle: function (address) {
    if (this.isSaved(address)) {
      this.removeFromFavourites(address);
    } else {
      this.addToFavourites(address);
    }
  },
  addToFavourites: function (address) {
    var favourites = this.state.favourites;
    favourites.push({
      address: address,
      timestamp: Date.now()
    });
    this.setState({ favourites : favourites });
    localStorage.favourites = JSON.stringify(favourites);
  },
  removeFromFavourites: function (address) {
    var favourites = this.state.favourites,
        index = -1;
    favourites.forEach(function (favourite, i) {
      if (favourite.address == address) {
        index = i;
      }
    });
    if (index !== -1) {
      favourites.splice(index, 1);
      this.setState({ favourites : favourites });
      localStorage.favourites = JSON.stringify(favourites);
    }
  }
});

ReactDOM.render(<App />, document.getElementById('myApp'));