import React from 'react';
import Day from './Day';

class Week extends React.Component {
  render() {
    return(
      <React.Fragment>
        {
          Object.keys(this.props.week).map(day => {
            return <Day key={day} current={this.props.week[day]} />
          })
        }
      </React.Fragment>
    );
  }
}

export default Week;
