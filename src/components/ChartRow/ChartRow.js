import React, { Component } from 'react';
import './ChartRow.css';

class ChartRow extends Component {
 render() {
    if (this.props.orientation === 'left') {
        return (
        <div className="ChartRow ChartRow-left">
            <div className="ChartRow-barLabel"> 
                {this.props.row.state}
            </div>
            <div className="u-dottedLine"></div>
            <div className={`ChartRow-bar LeftBar ${this.props.row.state_po}`} style={{width: this.props.row.percentage + "%"}} onClick={() => alert(this.props.row.candidate.split(',')[1] + " " + this.props.row.candidate.split(',')[0] + " - " + this.props.row.candidatevotes)}>
                {this.props.formatData(this.props.row)}
            </div>
        </div>
        );
    } else if (this.props.orientation === 'right'){
        return (
        <div className="ChartRow">
            <div className={`ChartRow-bar RightBar ${this.props.row.state_po}`} style={{width: this.props.row.percentage + "%"}} onClick={() => alert(this.props.row.candidate.split(',')[1] + " " + this.props.row.candidate.split(',')[0] + " - " + this.props.row.candidatevotes)}>
                {this.props.formatData(this.props.row)}
            </div>
            <div className="u-dottedLine"></div>
            <div className="ChartRow-barLabel"> 
                {this.props.row.state}
            </div>
        </div>
        );
    }
  }
}
export default ChartRow;