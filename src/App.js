import React, { Component } from 'react';
import './App.css';

import Title from './components/Title/Title.js';
import Sidebar from './components/Sidebar/Sidebar.js';
import ButterflyChart from './components/ButterflyChart/ButterflyChart.js';
import Bar from './components/ChartRow/ChartRow.js';

class App extends Component {

  state = {
    // static values for Title component
    mainTitle: "U.S. Presidential Election Results",
    subTitleLeft: "Democrats", 
    fontAwesomeClassLeft: "fas fa-democrat", 
    subTitleRight: "Republicans",
    fontAwesomeClassRight: "fas fa-republican",    

    data: [], 
    yearOptions: [],
    yearSelected: {value: 1976, label: 1976},
    formatOptions: [
      {value: 'percentage', label: 'Percentage'},
      {value: 'voteCount', label: 'Vote Count'},
    ],
    formatSelected: [{value: 'voteCount', label: 'Vote Count'}],
    stateOptions:[], 
    stateSelected: null,
    democratData: [], 
    republicanData: [],
  }

  componentDidMount() {
    console.log('component is mounting')
    this.doFetch();
  }

  doFetch = () => {
    console.log('doing fetch');
    fetch("./data/data.json")
      .then(response => response.json())
      .then(data => {
          // pull election year options and state options
          let yearOptions = []
          let stateOptions = []
          for (let row of Object.values(data)) {
              if (!yearOptions.includes(row.year)) {
                yearOptions.push(parseInt(row.year));
              }
              if (!stateOptions.includes(row.state)) {
                stateOptions.push(row.state);
              }
          }

          this.setState({
            data: data, 
            yearOptions: yearOptions.map(year => {
              return {value: year, label: year}
            }),
            stateOptions: stateOptions.map(state => {
              return {value: state, label: state}
            }),
          })

          // filter data from selections to be rendered
          this.selectData();
      })

  }

  handleYearChange = (selectedOption) => {
    this.setState(
      {yearSelected: selectedOption}, () => {
        this.selectData();
      })
  }
  
  handleFormatChange = (selectedOption) => {
    this.setState(
      {formatSelected: selectedOption}, () => {
        this.selectData();
    })
  }

  handleStateChange = (selectedOption) => {
    this.setState(
      {stateSelected: selectedOption}, () => {
        this.selectData();
    })
  }
  
  selectData = () => {
    console.log('selecting Data for render'); 
    let newDemData = []; 
    let newRepData = []; 

    const yearSelected = this.state.yearSelected.value; 
    
    // set defualt filter as 'all' states unless selected by user
    let stateSelected = 'all'
    if(this.state.stateSelected && this.state.stateSelected.length > 0) {
      stateSelected = this.state.stateSelected.map(state => state.value); 
    }

    for (let row of Object.values(this.state.data)) {
      if (row.year === yearSelected && row.party === 'democrat' && (stateSelected == 'all' || stateSelected.includes(row.state))) {
        newDemData.push(row); 
      } else if (row.year === yearSelected && row.party === 'republican' && (stateSelected == 'all' || stateSelected.includes(row.state))) {
        newRepData.push(row);
      }
    }
    this.setState({
      democratData: newDemData, 
      republicanData: newRepData,
    })
  }

  formatData = (row) => {
    if (this.state.formatSelected.value ==='percentage') {
        return row.percentage + '%'; 
    } else {
        return row.candidatevotes.toLocaleString(); 
    }
  }

  render() {
    console.log('---- rendering');

    return (
      <div className="Container">
        <div className="Column-left">
          <Sidebar
            {...this.state}
            handleYearChange={this.handleYearChange}
            handleFormatChange={this.handleFormatChange}
            handleStateChange={this.handleStateChange}
          />
        </div>
        <div className="Column-right">
          <Title 
            {...this.state}
          />
          <ButterflyChart
            leftData={this.state.democratData}
            rightData={this.state.republicanData}
            formatData={this.formatData}
          />
        </div>
      </div>
    );
  }
}

export default App;
