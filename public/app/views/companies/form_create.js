'use strict';
const React = require('react');
const _ = require('underscore');
const Input = require('components/form_input.jsx');
const Select = require('components/form_select.jsx');
const Textarea = require('components/form_textarea.jsx');
const sectors = require('options/sectors.json');
const cities = require('options/cities.json');

module.exports = React.createClass({
  getInitialState() {
    return {
      company: {}
    }
  },

  componentDidMount() {
    let company = {};
    if (this.props.company) {
      company = this.props.company;
    } else if (localStorage.getItem('company')) {
      company = JSON.parse(localStorage.getItem('company'));
    }

    this.setState({company});
  },

  componentWillReceiveProps(props) {
    if(props.company) {
      this.setState({company: props.company});
    }
  },

  handleChange() {
    const ref = this.refs;
    const company = _.extend(this.state.company, {
      name: React.findDOMNode(ref.name.refs.input).value,
      nit: React.findDOMNode(ref.nit.refs.input).value,
      sector: React.findDOMNode(ref.sector.refs.select).value,
      city: React.findDOMNode(ref.city.refs.select).value,
      address: React.findDOMNode(ref.address.refs.input).value,
      phone: React.findDOMNode(ref.phone.refs.input).value,
      web: React.findDOMNode(ref.web.refs.input).value,
      comment: React.findDOMNode(ref.comment.refs.textarea).value,
    });

    this.setState({company});
  },

  handleSubmit(e) {
    e.preventDefault();
    const company = this.state.company;
    this.props.onSubmit(company);
  },

  clean(e) {
    e.preventDefault();
    this.setState({company: {}});
  },

  render() {
    const company = this.state.company;

    const btnCleanText = this.props.btnCleanText || 'limpiar';
    const btnStoreText = this.props.btnStoreText || (<i className="fa fa-chevron-right"></i>);

    return (
     <form onSubmit={this.handleSubmit}>
        <div className="row">

         <div className="form-group col-sm-6">
          <Input
            ref="name"
            onInputChange={this.handleChange}
            value={company.name}
            placeholder="Nombre"
          />
         </div>

         <div className="form-group col-sm-6">
          <Input
            ref="nit"
            onInputChange={this.handleChange}
            value={company.nit}
            placeholder="Nit"
          />
         </div>

         <div className="form-group col-sm-6">
          <Select
            ref="sector"
            options={sectors}
            default="Seleccionar sector"
            onSelectChange={this.handleChange}
            value={company.sector}
          />
         </div>

         <div className="form-group col-sm-6">
          <Select
            ref="city"
            options={cities}
            default="Seleccionar ciudad"
            onSelectChange={this.handleChange}
            value={company.city}
          />
         </div>

        </div>
       <div className="form-group">
       <Input
          ref="address"
          onInputChange={this.handleChange}
          value={company.address}
          placeholder="Dirección"
        />
       </div>

       <div className="row">
         <div className="form-group col-lg-6">
           <Input
              ref="phone"
              onInputChange={this.handleChange}
              value={company.phone}
              placeholder="Teléfono"
            />
         </div>

         <div className="form-group col-lg-6">
            <Input
              ref="web"
              onInputChange={this.handleChange}
              value={company.web}
              placeholder="Web"
            />
         </div>
       </div>

        <div className="form-group">
        <Textarea
          ref="comment"
          onTextareaChange={this.handleChange}
          value={company.comment}
          placeholder="Comentario"
        />
       </div>
       <button className="btn btn-primary btn-sm pull-right">{btnStoreText}</button>
       <a href="#" className="btn btn-default btn-sm" onClick={this.clean}>{btnCleanText}</a>
     </form>
    );
  }
});