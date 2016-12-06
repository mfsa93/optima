'use strict';
import React from 'react';
import Chart from 'chart.js';
import uid from 'uid';
import _ from 'lodash';

export default React.createClass({
  getInitialState() {
    return {
      id: `chart-${uid()}`,
      chart: {}
    }
  },

  getDefaultProps() {
    return {
      data: {
        type: 'bar',
        data: {}
      },
      options: {}

    }
  },

  componentDidMount() {
    let data = _.extend({data: this.props.data}, {options: this.props.options}, {type: 'bar'});
    let ctx = document.getElementById(this.state.id).getContext("2d");
    let myChart = new Chart(ctx, data);
    this.setState({chart: myChart});
  },

  componentWillReceiveProps(props) {
    if(props.data) {
      this.updateChart(props.data);
    };
  },

  componentWillUnmount() {
    this.state.chart.destroy();
  },

  updateChart(data) {
    let chart = this.state.chart;
    chart.data.datasets = data.datasets;
    chart.update();
  },

  render() {
    return (
      <canvas
        id={this.state.id}
        width="400"
        height="400"
      ></canvas>
    )
  }
});
