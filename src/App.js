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
      previousMonth: [],
      previousMonthActive: false,
      latitude: null,
      longitude: null,
      error: null
    };
  }

  componentDidMount() {
    /*global google*/
    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), {types: ['geocode']});
    autocomplete.addListener('place_changed', () => {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      
      this.queryDarkSky(lat, lng);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.queryDarkSky(position.coords.latitude, position.coords.longitude);
        },
        
        () => {
          this.setState({
            error: 'Geolocation failed. You can use the input above to enter your city/country'
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
      // Filtering the first day as it's the same as the current one
      const week = data.daily.data.filter((i, day) => day > 0);

      this.setState({
        current,
        week,
        latitude: data.latitude,
        longitude: data.longitude,
        error: null
      });
    }
  }

  onError = (error) => {
    this.setState({
      error
    });
  }

  onTimeRequestSuccess = (data) => {
    this.setState({
      previousMonth: [...this.state.previousMonth, data.daily.data[0]],
      previousMonthActive: true
    });
    
    // Sorting the array of days by time so it's in order
    const sorted = this.state.previousMonth.sort((a, b) => a.time - b.time);

    this.setState({
      previousMonth: sorted
    });
  }

  queryDarkSky = (latitude, longitude, time = false) => {
    const url = time ? `/api/darksky?latitude=${latitude}&longitude=${longitude},${time}` : `/api/darksky?latitude=${latitude}&longitude=${longitude}`;

    darkSky(url, this.onSuccess, this.onError);
  }

  loadPreviousMonth = async () => {
    if (this.state.previousMonth.length === 0) {
      const current = {...this.state};

      for (let i=30; i >= 1; i--) {
        const date = new Date();
        const previousDay = Math.floor(date.setDate(date.getDate() - i) / 1000);
        const url = `/api/darksky?latitude=${current.latitude}&longitude=${current.longitude},${previousDay}`;

        await darkSky(url, this.onTimeRequestSuccess, this.onError);
      }
    } else {
      this.setState({
        previousMonthActive: true
      });
    }
  }

  loadCurrentDay = () => {
    this.setState({
      previousMonthActive: false
    });
  }

  render() {
    const error = this.state.error;
    return (
      <main className="weatherapp">
        <h1 className="weatherapp__title">Weather App</h1>
        <input type="text" className="weatherapp__input" id="address" name="address" placeholder="Enter your location" />
        {
          error &&
          <div className="error">
            {error}
          </div>
        }
        { this.state.previousMonthActive ? (
          <div className="weatherapp__week">
            <Week week={this.state.previousMonth} />
            <button className="weatherapp__next" onClick={this.loadCurrentDay}><svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.9 23.9"><path fill="#fff" d="M14.2 10.2L4.7.7c-.9-.9-2.3-.9-3.2 0l-.8.8c-.9.9-.9 2.3 0 3.2L8 12 .7 19.3c-.9.9-.9 2.3 0 3.2l.8.8c.9.9 2.3.9 3.2 0l9.6-9.6c.5-.5.7-1.1.6-1.7 0-.7-.2-1.3-.7-1.8z"/></svg></button>
          </div>
        ) : (
            this.state.week.length === 0 ? (
              <div className="weatherapp__loading">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            ) : (
            <React.Fragment>
              <button className="weatherapp__previous" onClick={this.loadPreviousMonth}><svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.9 23.9"><path fill="#fff" d="M.6 13.7l9.6 9.6c.9.9 2.3.9 3.2 0l.8-.8c.9-.9.9-2.3 0-3.2L6.9 12l7.3-7.3c.9-.9.9-2.3 0-3.2l-.8-.8c-.9-.9-2.3-.9-3.2 0L.6 10.3c-.4.4-.6 1-.6 1.7 0 .6.2 1.2.6 1.7z"/></svg></button>
              <div className="weatherapp__current">
                <Day current={this.state.current} isCurrent={true} />
              </div>
              <div className="weatherapp__week">
                <Week week={this.state.week} />
              </div>
            </React.Fragment>
            )
        )}
      </main>
    );
  }
}

export default App;
