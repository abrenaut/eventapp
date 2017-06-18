import React from 'react';

class Title extends React.Component {
  render() {
    return (
    <div>
       <div>
          <h1>{this.props.eventCount} Events</h1>
       </div>
    </div>
    );
  }
};
 
export default Title;