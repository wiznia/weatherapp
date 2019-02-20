import React from 'react';
import { darkSky } from './helpers'
import Day from './components/Day';
import Week from './components/Week';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      current: {},
      week: [],
      error: null
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.queryDarkSky(position.coords.latitude, position.coords.longitude);
        },
        
        () => {
          this.setState({
            error: 'Geolocation failed'
          });
        }
      );
    } else {
      this.setState({
        error: 'Your browser does not support geolocation'
      });
    }
  }

  onSuccess = (data) => {
    if (data) {
      const current = data.currently;
      const week = data.daily.data.filter((i, day) => day > 0);

      this.setState({
        current,
        week,
        error: null
      });
    }
  }

  onError = (error) => {
    this.setState({
      error
    });
  }

  queryDarkSky = (latitude, longitude, time = false) => {
    const url = time ? `/api/darksky?latitude=${latitude}&longitude=${longitude},${time}` : `/api/darksky?latitude=${latitude}&longitude=${longitude}`;

    darkSky(url, this.onSuccess, this.onError);
  }

  render() {
    const error = this.state.error;
    return (
      <main className="weatherapp">
        <h1 className="weatherapp__title">Weather App</h1>
        {
          error &&
          <div>
            {error.message || error.toString} {` (${error.status} ${error.statusText})`}
          </div>
        }
        <div className="weatherapp__current">
          <Day current={this.state.current} isCurrent={true} />
        </div>
        <div className="weatherapp__week">
          <Week week={this.state.week} />
        </div>
      </main>
    );
  }
}

export default App;
