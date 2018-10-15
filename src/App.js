import React, { Component } from 'react';
import './App.css';
import MomentReact from 'react-moment';
import moment from 'moment-timezone';
import IntegrationReactSelect from './SearchBox';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      location1: 'America/New_York',
      location2: 'Asia/Kolkata'
    }

    this.onChageTimeZone = this.onChageTimeZone.bind(this);
  }

  onChageTimeZone(location, timezone){
    console.log(location, timezone.value);
    if(timezone.value){
      this.setState({
        [location]: timezone.value
      });
    }
  }
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
    const time1 = moment().tz(this.state.location1).startOf('day');
    const time2 = moment(time1).tz(this.state.location2)
    // console.log(moment.tz.names());

    let dayTimes1 = this.calcDay(time1);
    let dayTimes2 = this.calcDay(time2);
    
    return (
      <div className="app">
        <div className="left" key="left">
          <IntegrationReactSelect onChange={(value) => this.onChageTimeZone('location1', value)}/>
          <h3>{this.state.location1}</h3>
          {dayTimes1}
        </div>
        <div className="right" key="right">
          <IntegrationReactSelect onChange={(value) => this.onChageTimeZone('location2', value)}/>
          <h3>{this.state.location2}</h3>
          {dayTimes2}
        </div>
      </div>
    );
  }
}

export default App;
