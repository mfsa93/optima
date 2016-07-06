'use strict';
var React = require('react');
var Select = require('react-select');
var request = require('superagent');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      options: [],
      services: [],
      disableAdd: true,
      serviceId: null,
      quotationId: null,
      optionSelected: ''
    }
  },

  componentDidMount: function() {
    this.fetchOptions();
  },

  componentWillReceiveProps: function(props) {
    this.setState(props);
    this.fetchServices(props.quotationId);
  },

  fetchOptions: function() {
    request
      .get('/api/v1/services')
      .end((err, res) => {
        var options = res.body.map(opt => ({
          value: opt.id,
          label: opt.title
        }));

       this.setState({options: options});

      });
  },

  fetchServices: function(id) {
    request
      .get(`/api/v1/quotations/${id}/services`)
      .end((err, res) => this.setState({
      services: res.body
    }));
  },

  handleChange: function(id, option) {
    this.setState({
      serviceId: id,
      disableAdd: false,
      optionSelected: option[0].label
    });
  },

  store: function(id) {
    request
      .post(`/api/v1/quotations/${this.state.quotationId}/services`)
      .send({service_id: this.state.serviceId})
      .end((err, res) => this.fetchServices(this.state.quotationId));
  },

  handleDelete: function(id) {
    request
      .del(`/api/v1/services/${id}`)
      .send({quotation_id: this.state.quotationId})
      .end((err, res) => this.setState({
      services: _.reject(this.state.services, service => service.id == id)
    }));
  },

  render: function() {
    var serviceNodes = this.state.services.map(service => <tr key={service.id}>
                <td>{service.title}</td>
                <td>
        <button
          className="btn btn-default btn-xs"
          onClick={this.handleDelete.bind(null, service.id)}
          disabled={this.props.disabled ? true : false}
        >
          Eliminar
        </button>
      </td>
              </tr>);

    return (
      <div className="panel">
        <div className="panel-body">
          <div className="row">
            <div className="form-group col-sm-12">
             <Select
                placeholder="Servicios"
                value={this.state.optionSelected}
                options={this.state.options}
                onChange={this.handleChange}
                disabled={this.props.disabled ? true : false}
              />
             <br/>
             <button
              className="btn btn-primary btn-sm"
              disabled={this.state.disableAdd}
              onClick={this.store}>Agregar Servicio</button>
            </div>
             <hr/>
             <div className="table-responsive col-sm-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Servicio</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceNodes}
                </tbody>
              </table>
          </div>
          </div>
        </div>
      </div>
    );
  }
});