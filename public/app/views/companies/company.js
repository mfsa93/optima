'use strict';
import React from 'react';
import request from 'axios';
import Form from 'views/contacts/form_create';
import Contact from 'views/companies/contact';

module.exports = React.createClass({
  getDefaultProps() {
    return {
      company: {}
    }
  },

  getInitialState() {
    return {
      contact: {},
      contacts: [],
      showForm: false
    }
  },

  handleSubmit(contact) {
    const contactData = {...contact, company_id: this.props.company.id};

    if(contact.id) {
      this.updateContact(contactData);
    } else {
      this.storeContact(contactData);
    }
  },

  updateContact(contactData) {
    request
      .put('/api/v1/contacts/' + contactData.id)
      .send(contactData)
      .end((err, res) => {
        if(err) return this.setState({errorMessages: err.response.body});
        this.setState({
          contact: {}
        });
        this.showForm();
      });
  },

  storeContact(contactData) {
    request
      .post('/api/v1/contacts')
      .send(contactData)
      .end((err, res) => {
        if(err) return this.setState({errorMessages: err.response.body});
        this.setState({contacts: this.state.contacts.concat([res.body])});
        this.showForm();
      });
  },

  showForm() {
    this.setState({showForm: !this.state.showForm});
  },

  handleEditContact(contact, e) {
    if(e) e.preventDefault();
  },

  handleDeleteContact(contact, e) {
    e.preventDefault();
    const id = contact.id;
    request
      .del('/api/v1/contacts/' + id)
      .end((err, res) => this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id )
    }));
  },

  render() {
    const {company} = this.props;
    const {name, nit, address, phone} = company;
    const {showForm} = this.state;

    return (
      <div className="panel">
      <div className="panel-body">
        <table className="table">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>NIT</th>
              <th>Dirección</th>
              <th>Telefono</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{name}</td>
              <td>{nit}</td>
              <td>{address}</td>
              <td>{phone}</td>
              <td><button onClick={this.props.onEdit.bind(null, company)} className="btn btn-sm">Editar</button></td>
            </tr>
          </tbody>
        </table>

        <hr/>

        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Telefonos</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ale</td>
              <td>Ale</td>
              <td>Ale</td>
              <td>Ale</td>
            </tr>
          </tbody>
        </table>

        <div className={showForm ? "" : "hidden"}>
        <br/>
        <div className={this.state.errorMessages ? 'alert alert-danger' : ''}>{this.state.errorMessages ? this.state.errorMessages : ''}</div>
          <Form
            contact={this.state.contact}
            btnText="Guardar"
            onSubmit={this.handleSubmit}
          />
        </div>
        </div>
      </div>
    );
  }
});
