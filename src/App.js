import React, { Component } from 'react';
import './App.css';
import MomentReact from 'react-moment';
import moment from 'moment-timezone';
import IntegrationReactSelect from './SearchBox';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      location1: 'America/New_York',
      location2: 'Asia/Kolkata',
      now: moment()
    }
    setInterval(() => this.setState({now: moment()}),1000);

    this.onChageTimeZone = this.onChageTimeZone.bind(this);
  }

  onChageTimeZone(location, timezone){
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
        <Typography variant="body2" key={time+i}>
          <MomentReact
            className="time"
            add={{ hours: i }}
            format='hh:mm a'>
              {time}
          </MomentReact>
        </Typography>
      );
    }
    return (
    <div className="day">
      {dayTimes}
    </div>);
  }

  render() {
    const { location1, location2 } = this.state;
    const time1 = moment().tz(location1).startOf('day');
    const time2 = moment(time1).tz(location2);
    const dayTimes1 = this.calcDay(time1);
    const dayTimes2 = this.calcDay(time2);
    
    return (
      <Grid container className="app">
        <Grid xs={6} className="left" key="left">
          <IntegrationReactSelect onChange={(value) => this.onChageTimeZone('location1', value)}/>
          <Typography component="h5" variant="h5">{location1}</Typography>
          <Typography component="h4" variant="h4">
            <MomentReact format='hh:mm:ss a'>{this.state.now.tz(location1)}</MomentReact>
          </Typography>
          {dayTimes1}
        </Grid>
        <Grid xs={6} className="right" key="right">
          <IntegrationReactSelect onChange={(value) => this.onChageTimeZone('location2', value)}/>
          <Typography component="h5" variant="h5">{location2}</Typography>
          <Typography component="h4" variant="h4">
            <MomentReact format='hh:mm:ss a'>{moment().tz(location2)}</MomentReact>
          </Typography>
          {dayTimes2}
        </Grid>
      </Grid>
    );
  }
}

export default withTheme()(App);
