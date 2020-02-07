import React, { Component } from 'react';
import './Title.css';

class Title extends Component {
 render() {
    return (
    <div className="Title">
        <div className="Title-main">
            <h1>{this.props.mainTitle}</h1>
        </div>
        <div className="Title-sub">
            <div className="Title-sub--left">
                <h2><i className={this.props.fontAwesomeClassLeft}></i> {this.props.subTitleLeft}</h2>
            </div>
            <div className="Title-sub--right">
                <h2><i className={this.props.fontAwesomeClassRight}></i> {this.props.subTitleRight}</h2>
            </div>
        </div>
    </div>
    );
  }
}
export default Title;