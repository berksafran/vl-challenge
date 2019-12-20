import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class BarChart extends Component {
  render() {
    const data = {
      labels: this.props.valueLabel,
      datasets: [
        {
          label: this.props.label,
          backgroundColor: this.props.bgColor || "rgba(255,99,132,0.2)",
          borderColor: this.props.borderColor || "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: this.props.hoverBgColor || "rgba(255,99,132,0.4)",
          hoverBorderColor: this.props.borderColor || "rgba(255,99,132,1)",
          data: this.props.value
        }
      ]
    };
    return (
      <div style={{ margin: 30 }}>
        <h4>{this.props.title}</h4>
        <Bar
          data={data}
          onElementsClick={this.props.onClick}
          options={{
            maintainAspectRatio: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ],
            }
          }}
        />
      </div>
    );
  }
}
