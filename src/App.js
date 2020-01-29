import React, { Component } from 'react';
import Select from 'react-select';
import './App.css';

class App extends Component {

  state = {
    data: [], 
    yearOptions: [],
    yearSelected: {value: 1976, label: 1976},
    formatOptions: [
      {value: 'percentage', label: 'Percentage'},
      {value: 'voteCount', label: 'Vote Count'},
    ],
    formatSelected: [{value: 'percentage', label: 'Percentage'}],
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
          <div className="Chart-selectors">
              <Select 
                className="Chart-selectors-item"
                value={this.state.yearSelected}
                onChange={this.handleYearChange}
                options={this.state.yearOptions}
                />
              <Select
                className="Chart-selectors-item"
                value={this.state.formatSelected}
                onChange={this.handleFormatChange}
                options={this.state.formatOptions}
              />
              <Select
                className="Chart-selectors-item"
                value={this.state.stateSelected}
                isMulti
                isSearchable
                placeholder="All States"
                closeMenuOnSelect={false}
                onChange={this.handleStateChange}
                options={this.state.stateOptions}
              />
            </div>
        </div>
        <div className="Column-right">
          <div className="Title">
              <h1>U.S. Presidential Election Results</h1>
          </div>
          <div className="SubTitle">
            <div className="SubTitle-left">
              <h2><i className="fas fa-democrat"></i> Democrats</h2>
            </div>
            <div className="SubTitle-right">
              <h2><i className="fas fa-republican"></i> Republicans</h2>
            </div>
          </div>
          <div className="Chart">
              <div className="Chart-left">
              {
                this.state.democratData.map(row => (
                  <div className="Chart-row">
                  <div className="Chart-barLabel"> 
                    {row.state}
                  </div>
                  <div className="u-dottedLine"></div>
                  <div className={`Chart-bar DemocraticBar ${row.state_po}`} style={{width: row.percentage + "%"}} onClick={() => alert(row.candidate.split(',')[1] + " " + row.candidate.split(',')[0] + " - " + row.candidatevotes)}>
                      {this.formatData(row)}
                  </div>
                  </div>
                ))
              }
              </div>
              <div className="Chart-divider"></div>
              <div className="Chart-right" >
              {
                this.state.republicanData.map(row => (
                  <div className="Chart-row">
                  <div className={`Chart-bar RepublicanBar ${row.state_po}`} style={{width: row.percentage + "%"}} onClick={() => alert(row.candidate.split(',')[1] + " " + row.candidate.split(',')[0] + " - " + row.candidatevotes)}>
                      {this.formatData(row)}
                  </div>
                  <div className="u-dottedLine"></div>
                  <div className="Chart-barLabel"> 
                    {row.state}
                  </div>
                  </div>
                ))
              }
              </div>
          </div>
      </div>
    </div>
    );
  }
}

export default App;
