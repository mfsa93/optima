'use strict';
import React from 'react';
import moment from 'moment';
import updateItem from 'lib/update_item';
require('moment/locale/es');

const quoTracking = React.createClass({
  getDefaultProps: function() {
    return {
      tracking: {}
    }
  },

  render: function() {
    const tracking = this.props.tracking;
    let showTable = false;
    let contact;
    let by;

    if(tracking.contact) {
      contact = `${tracking.contact.name} ${tracking.contact.lastname}`;
    }

    if(tracking.user) {
      by = `${tracking.user.name} ${tracking.user.lastname}`;
    }

    return (
      <li className="list-item">
        <p><b>Contacto:</b> {contact}</p>
        <b>Reporte:</b> 
        <br/>
          <div className="row">
          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{__html: tracking.report}} />
          </div>
          </div>
        <b>Por: </b> {by} <i>{moment(`${tracking.register_date} ${tracking.register_time}` ).fromNow()}</i>
        <hr/>
      </li>
    )
  }
});

export default quoTracking;