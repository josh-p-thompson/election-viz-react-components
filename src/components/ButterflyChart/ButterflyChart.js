import React, { Component } from 'react';
import './ButterflyChart.css';
import ChartRow from '../ChartRow/ChartRow';

class ButterflyChart extends Component {
 render() {
    return (
    <div className="ButterflyChart">
        <div className="ButterflyChart-left">
        {
        this.props.leftData.map(row => (
            <ChartRow
                orientation='left'
                row={row}
                formatData={this.props.formatData}
            />
        ))
        }
        </div>
        <div className="ButterflyChart-divider"></div>
        <div className="ButterflyChart-right" >
        {
        this.props.rightData.map(row => (
            <ChartRow
                orientation='right'
                row={row}
                formatData={this.props.formatData}
            />
        ))
        }
        </div>
    </div>
    );
  }
}
export default ButterflyChart;