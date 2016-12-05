'use strict';
import React from 'react';
import request from 'superagent';
import _ from 'underscore';
import moment from 'moment';
import Contact from 'views/quotation/contact';
import Filters from 'views/quotation/filters';
import Edit from 'views/quotation/edit';
import Status from 'views/quotation/status';
import Products from 'views/quotation/products';
import Services from 'views/quotation/services';
import Comment from 'views/quotation/comment';
import Mail from 'views/quotation/mails';
import NoEffective from 'views/quotation/no_effective';
import NoSend from 'views/quotation/no_send';
import Times from 'views/quotation/times';
import Activities from 'views/quotation/activity';
import Trackings from 'views/quotation/trackings';

const alertify = require('alertifyjs');
alertify.set('notifier','position', 'top-right');


module.exports = React.createClass({
  getInitialState: function() {
    return {
      quotation: {},
      products: [],
      showComment: false,
      showMail: false,
      showNoEffective: false,
      showNoSend: false,
      disabled: false
    }
  },

  componentDidMount: function() {
    this.fetchQuotation();
  },

  fetchQuotation: function() {
    request
      .get(`/api/v1/quotations/${this.props.params.id}`)
      .end((err, res) => {
        if(err) return console.log(err.response.text);
        this.setState({quotation: res.body});
        this.handleDisabled(res.body.status);
      });
  },

  handleShowComment: function() {
    let show = true;
    if(this.state.showComment) {
      show = false;
    }

    this.setState({showComment: show});
  },

  handleShowMail() {
    this.setState({showMail: !this.state.showMail});
  },

  handleShowNoEffective() {
    this.setState({showNoEffective: !this.state.showNoEffective});
  },

  handleShowNoSend() {
    this.setState({showNoSend: !this.state.showNoSend});
  },

  handleOptions: function(filters) {
    const data = _.extend(this.state.quotation, filters);
    this._update(data);
  },

  handleSaveComment: function(comment) {
    this._update({comment: comment});
    this.setState({showComment: false});
  },

  handleSaveMail: function(mail) {
    this._update(mail);
    this.setState({showMail: false});
  },

  handleServiceApproval: function(serviceApproval) {
    this._update({service_approval: serviceApproval})
  },

  handleSaveNoEffective: function(status) {
    this._update(status);
    this.setState({
      showNoEffective: false,
      showNoSend: false
    });
  },

  handleStatus: function(status) {
    this._update(status);
  },

  changeContact: function(contactId) {
    this._update({contact_id: contactId});
  },

  _update(data) {
    data = _.extend(this.state.quotation, data);
    request
      .put(`/api/v1/quotations/${this.props.params.id}`)
      .send(data)
      .end((err, res) => {
        if(err) return alertify.error(res.body.message);
        this.setState({quotation: res.body});
        this.handleDisabled(res.body.status);
      });
  },

  handleDisabled(status) {
    let disabled = false;

    if(status !== 'Borrador') {
      disabled = true;
    }
    this.setState({disabled: disabled});
  },

  render() {
    let quotation = this.state.quotation;
    let products = this.state.products;

    return (
      <div>
        <div className="col-md-12">
        <div className="panel">
          <div className="panel-body">
          <h4 style={{margin: "0 0 15px 0"}}>
            Cotización {quotation.id} • {quotation.status} • <small>{moment(quotation.created_at).fromNow()}</small> <small className={quotation.sent_at ? "" : "hidden"}>enviada {moment(quotation.sent_at).fromNow()}</small>
          </h4>
          </div>
        </div>

        </div>

        <div className="col-md-9">

          <Filters
            onChange={this.handleOptions}
            quotation={quotation}
            disabled={this.state.disabled}
          />

          <Edit
            quotation={quotation}
            onShowComment={this.handleShowComment}
            onShowMails={this.handleShowMail}
            onServiceApproval={this.handleServiceApproval}
            />

          <Comment
            show={this.state.showComment}
            onClose={this.handleShowComment}
            comment={quotation.comment}
            OnSaveComment={this.handleSaveComment}
            />

          <Mail
            show={this.state.showMail}
            onClose={this.handleShowMail}
            quotation={quotation}
            onSaveMail={this.handleSaveMail}
            />


          <Products
            quotationId={quotation.id}
            disabled={this.state.disabled}
          />

          <Services
            quotationId={quotation.id}
            disabled={this.state.disabled}
          />

          <Status
            quotation={quotation}
            handleOpenNoEffective={this.handleShowNoEffective}
            handleOpenNoSend={this.handleShowNoSend}
            onStatusChange={this.handleStatus}
            disabled={this.state.disabled}
          />

          <NoEffective
            quotation={quotation}
            show={this.state.showNoEffective}
            onSave={this.handleSaveNoEffective}
          />

          <NoSend
            quotation={quotation}
            show={this.state.showNoSend}
            onSave={this.handleSaveNoEffective}
          />

          <Trackings quotationId={quotation.id} />

        </div>

        <div className="col-md-3">
          <div >
            <Contact
              contact={quotation.contact}
              company={quotation.company}
              changeContact={this.changeContact}
              />
              <Activities
                quotationId={quotation.id}
              />
            </div>
        </div>
      </div>
    );
  }
});