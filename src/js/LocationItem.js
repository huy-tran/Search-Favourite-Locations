var React = require('react');
var moment = require('moment');

var LocationItem = React.createClass({
  propTypes: {
    address: React.PropTypes.string.isRequired,
    timestamp: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
    activeClass: React.PropTypes.bool.isRequired
  },
  render: function(){
    var className = 'list-group-item';
    className += this.props.activeClass ? ' active' : '';
    return (
      <div className={className} onClick={this.handleClick}>
        <h5>{this.props.address}</h5>
        <span>{moment(this.props.timestamp).fromNow()}</span>
        <span className="glyphicon glyphicon-menu-right"></span>
      </div>
    );
  },
  handleClick: function() {
    this.props.onClick(this.props.address);
  }
});

module.exports = LocationItem ;