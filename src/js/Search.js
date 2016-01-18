var React = require('react');

var Search = React.createClass({
  propTypes: {
    onSearch: React.PropTypes.func.isRequired
  },
  render: function(){
    return (
      <form className="row search-form" onSubmit={this.handleSubmit} role="form">
        <div className="form-group">
          <div className="col-md-6 col-md-offset-3">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search favourite location..." ref={this.setRef}/>
              <span className="input-group-addon">
                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
              </span>
            </div>
          </div>
        </div>
      </form>
    );
  },
  setRef: function (ref) {
    this.searchInput = ref;
  },
  handleSubmit: function (e) {
    e.preventDefault();
    this.props.onSearch(this.searchInput.value);
    this.searchInput.value = '';
  }
});

module.exports = Search ;