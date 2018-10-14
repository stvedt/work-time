import React, { Component } from 'react';
import './App.css';
import MomentReact from 'react-moment';
import moment from 'moment-timezone';
import IntegrationReactSelect from './SearchBox';

class App extends Component {
  // constructor(props){
  //   super(props);
  // }
  calcDay(time) {
    let dayTimes = [];
    for(let i = 0; i < 24; i++){
      dayTimes.push(
        <MomentReact
          className="time"
          add={{ hours: i }}
          format='hh:mm a'
          key={time+i}>
            {time}
        </MomentReact>
      );
    }
    return dayTimes;
  }

  render() {
    const now = moment();
    const startDay = now.startOf('day')
    const india = moment(startDay).tz('Asia/Kolkata')
    // console.log(moment.tz.names());

    let nyTimes = this.calcDay(now);
    let indiaRows = this.calcDay(india);
    
    return (
      <div className="app">
        <div className="left" key="left">
          <IntegrationReactSelect onChange={(value) => console.log(value)}/>
          <h3>NYC</h3>
          {nyTimes}
        </div>
        <div className="right" key="right">
          <IntegrationReactSelect onChange={(value) => console.log(value)}/>
          <h3>India</h3>
          {indiaRows}
        </div>
      </div>
    );
  }
}

export default App;
