import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    data: [], 
    yearOptions: [],
    yearSelected: 1976,
    formatSelected: 'Percentage',
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
          // pull election years for selecting dates
          let yearOptions = []
          for (let row of Object.values(data)) {
              if (!yearOptions.includes(row.year)) {
                yearOptions.push(row.year);
              }
          }
          this.setState({
            data: data, 
            yearOptions: yearOptions,
          })
          // filter data from selections to be rendered
          this.selectData();
      })

  }

  onSelectDateChange = (ev) => {
    this.setState(
      {yearSelected: parseInt(ev.target.value)}, () => {
        console.log('year selected: ', this.state.yearSelected);
        this.selectData();
      })
  }
  
  onSelectFormatChange = (ev) => {
    this.setState(
      {formatSelected: ev.target.value}, () => {
        console.log('year selected: ', this.state.yearSelected);
        this.selectData();
    })
  }
  
  selectData = () => {
    console.log('selecting Data for render'); 
    let newDemData = []; 
    let newRepData = []; 

    for (let row of Object.values(this.state.data)) {
      if (row.year === this.state.yearSelected && row.party === 'democrat') {
        newDemData.push(row); 
      } else if (row.year === this.state.yearSelected && row.party === 'republican') {
        newRepData.push(row);
      }
    }
    console.log('dem data: ', newDemData);
    console.log('rep data: ', newRepData);
    this.setState({
      democratData: newDemData, 
      republicanData: newRepData,
    })
  }

  formatData = (row) => {
    if (this.state.formatSelected ==='Percentage') {
        return row.percentage + '%'; 
    } else {
        return row.candidatevotes.toLocaleString(); 
    }
  }

  render() {
    console.log('---- rendering');

    return (
      <div className="Container">
        <div className="Chart">
            <div className="Chart-title">
                <h1>U.S. Presidential Election Results</h1>
            </div>
            <div className="Chart-selectors">
                <select onChange={this.onSelectDateChange}>
                {
                  this.state.yearOptions.map(year => (
                    <option>{year}</option>
                  ))
                }
                </select>
                <select onChange={this.onSelectFormatChange}>
                    <option>Percentage</option>
                    <option>Vote Count</option>
                </select>
            </div>
            <div className="Chart-subtitleLeft">
                <h2><i className="fas fa-democrat"></i> Democrats</h2>
            </div>
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
            <div className="Chart-subtitleRight">
                <h2><i className="fas fa-republican"></i> Republicans</h2>
            </div>
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
    );
  }
}

export default App;
