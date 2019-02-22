import React from 'react';
import { convertUnixToDate } from '../helpers';
import SVG from './SVG';

class Day extends React.Component {
  render() {
    const { apparentTemperature, temperature, temperatureLow, temperatureHigh, summary, time, icon, humidity, windSpeed } = this.props.current;
    const width = this.props.isCurrent ? 120 : 60;
    return(
      <div className="day">
        { time &&
          <React.Fragment>
            <p className="day__title">{convertUnixToDate(time)[0]}</p>
            <time className="day__date">{convertUnixToDate(time)[1]}</time>
          </React.Fragment>
        }
        <div className="day__icon"><SVG name={icon} width={width} /></div>
        { temperature &&
          <React.Fragment>
          <div className="day__temperature">{temperature}°C</div>
            <div className="day__apparent-temperature">Feels like {apparentTemperature}°C</div>
          </React.Fragment>
        }
        <div className="day__description">{summary}</div>
        {
          (temperatureLow && temperatureHigh) &&
          <div className="day__bottom-info">
            <span title="Lowest temperature"><svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 29.8"><path d="M10.6 15.7v-4.1H4.4v4.1C1.8 16.9 0 19.4 0 22.4c0 4.1 3.3 7.4 7.5 7.4 4.1 0 7.5-3.3 7.5-7.4 0-3-1.8-5.6-4.4-6.7zM7.5 26.5c-1.2 0-2.4-.6-3.1-1.4 2.7.4 6.4-2.5 5.8-5.9.9.8 1.4 1.9 1.4 3.1 0 2.3-1.8 4.2-4.1 4.2zm5.8-22.8h-2.9V0H4.5v3.7H1.7l5.8 6.2 5.8-6.2z" fill="#fff" /></svg> {temperatureLow}°C</span>
            <span title="Highest temperature"><svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 29.8"><path d="M10.6 15.7v-4.1H4.4v4.1C1.8 16.9 0 19.4 0 22.4c0 4.1 3.3 7.4 7.5 7.4 4.1 0 7.5-3.3 7.5-7.4 0-3-1.8-5.6-4.4-6.7zM7.5 26.5c-1.3 0-2.4-.6-3.1-1.4 2.7.4 6.4-2.5 5.8-5.9.9.8 1.4 1.9 1.4 3.1 0 2.3-1.8 4.2-4.1 4.2zM4.6 9.9h5.9V6.2h2.8L7.5 0 1.7 6.2h2.9v3.7z" fill="#fff" /></svg> {temperatureHigh}°C</span>
          </div>
        }
        <div className="day__bottom-info">
          {
            humidity &&
            <span title="Humidity">
              <svg width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94 100"><path fill="#fff" d="M16.8.5c-.1-.6-1.1-.6-1.2 0C13.1 21 0 25.3 0 39.6c0 8.8 7.4 16 16.2 16 8.8 0 16.2-7.2 16.2-16C32.4 25.3 19.3 21 16.8.5zm61.6 0c-.1-.6-1.1-.6-1.2 0C74.7 21 61.6 25.3 61.6 39.6c0 8.8 7.4 16 16.2 16 8.8 0 16.2-7.2 16.2-16C94 25.3 81 21 78.4.5zm-32 44.4C43.9 65.5 30.8 69.7 30.8 84c0 8.8 7.4 16 16.2 16s16.2-7.2 16.2-16c0-14.3-13-18.5-15.6-39.1-.1-.6-1.1-.6-1.2 0z"/></svg>
              {Math.round(humidity * 100)}%
            </span>
          }
          {
            windSpeed &&
              <span title="Wind speed">
                <svg width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 18"><path fill="#fff" d="M13 18c-.8 0-1.6-.3-2.1-.9-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0 .2.2.4.3.7.3.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7 0-.3-.1-.5-.3-.7-.2-.2-.4-.3-.7-.3H1c-.6 0-1-.4-1-1s.4-1 1-1h12c.8 0 1.6.3 2.1.9.6.6.9 1.3.9 2.1s-.3 1.6-.9 2.1c-.5.6-1.3.9-2.1.9zm5.5-8H1c-.6 0-1-.4-1-1s.4-1 1-1h17.5c.4 0 .8-.2 1.1-.4.6-.6.6-1.5 0-2.1-.6-.6-1.5-.6-2.1 0-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4 1.4-1.4 3.6-1.4 4.9 0 1.4 1.4 1.4 3.6 0 5-.7.5-1.6.9-2.5.9zM10 6H1c-.6 0-1-.4-1-1s.4-1 1-1h9c.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4C8.4.3 9.2 0 10 0s1.6.3 2.1.9c1.2 1.2 1.2 3.1 0 4.2-.5.6-1.3.9-2.1.9z"/></svg>
                {Math.round(windSpeed * 3.6)}km/h
              </span>
          }
        </div>
      </div>
      );
    }
  }

  export default Day;
