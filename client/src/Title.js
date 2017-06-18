import React from 'react';

class Title extends React.Component {
  render() {
    return (
    <div>
      <h1>Total: {this.props.eventCount} Events</h1>
    </div>
    );
  }
};
 
export default Title;