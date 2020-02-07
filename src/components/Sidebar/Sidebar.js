import React, { Component } from 'react';
import './Sidebar.css';
import Select from 'react-select';

class Sidebar extends Component {
 render() {
    return (
    <div className="Sidebar">
        <Select 
          className="Sidebar-item"
          value={this.props.yearSelected}
          onChange={this.props.handleYearChange}
          options={this.props.yearOptions}
          />
        <Select
          className="Sidebar-item"
          value={this.props.formatSelected}
          onChange={this.props.handleFormatChange}
          options={this.props.formatOptions}
        />
        <Select
          className="Sidebar-item"
          value={this.props.stateSelected}
          isMulti
          isSearchable
          placeholder="All States"
          closeMenuOnSelect={false}
          onChange={this.props.handleStateChange}
          options={this.props.stateOptions}
        />
    </div>
    );
  }
}
export default Sidebar;