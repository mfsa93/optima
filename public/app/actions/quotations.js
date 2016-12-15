import request from 'axios';
const TYPE = 'QUOTATIONS';
const endpoint = 'api/v1/quotations';

export function fetch(params = {}) {
  return dispatch => {
		  return request
      .get(endpoint, {params})
      .then(res => dispatch({ type: `${TYPE}_FETCH`, payload: res.data}))
      .catch(err => dispatch({ type: `${TYPE}_FAIL`, payload: err.response.data}));
	}
}

export function fetchOne(id, params = {}) {
  return dispatch => {
		  return request
      .get(`${endpoint}/${id}`, {params})
      .then(res => dispatch({ type: `${TYPE}_SET_QUOTATION`, payload: res.data}))
      .catch(err => dispatch({ type: `${TYPE}_FAIL`, payload: err.response.data}));
	}
}

export function store(quotation = {}) {
  return dispatch => {
    return request
      .post('/api/v1/quotations', quotation)
      .then(res => dispatch({ type: `${TYPE}_STORE`, payload: res.data}))
      .catch(err => dispatch({ type: `${TYPE}_FAIL`, payload: err.response.data}));
  }
}

export function update(id, quotation = {}) {
  return dispatch => {
    return request
      .put(`/api/v1/quotations/${id}`, quotation)
      .then(res => dispatch({ type: `${TYPE}_SET_QUOTATION`, payload: res.data}))
      .catch(err => dispatch({ type: `${TYPE}_FAIL`, payload: err.response.data}));
  }
}

export function sendMail(id) {
   return dispatch => {
    return request
      .post(`/api/v1/quotations/${id}/sendmail`)
      .then(res => dispatch({ type: `${TYPE}_SET_QUOTATION`, payload: res.data}))
      .catch(err => dispatch({ type: `${TYPE}_FAIL`, payload: err.response.data}));
  }
}

//services 

export function fetchServices(quotationId) {
  return dispatch => {
    return request
      .get(`/api/v1/quotations/${quotationId}/services`)
      .then(res => dispatch({ type: `${TYPE}_FETCH_SERVICES`, payload: res.data}))
      .catch(err => dispatch({ type: `${TYPE}_FAIL`, payload: err.response.data})); 
  }
}

export function storeService(quotationId, service) {
  return dispatch => { 
    return request
    .post(`/api/v1/quotations/${quotationId}/services`, service)
    .then(res => dispatch({ type: `${TYPE}_ADD_SERVICE`, payload: res.data}))
    .catch(err => dispatch({ type: `${TYPE}_FAIL`, payload: err.response.data})); 
  }
}

export function removeService(id, quotationId) {
  return dispatch => { 
    return request
    .delete(`/api/v1/services/${id}`, {params: {quotation_id: quotationId}} )
    .then(res => dispatch({ type: `${TYPE}_REMOVE_SERVICE`, payload: res.data}))
    .catch(err => dispatch({ type: `${TYPE}_FAIL`, payload: err.response.data}));
  }
}