import React from 'react';

import EventItem from './EventItem';

class EventList extends React.Component {
  render() {
    const eventNode = this.props.events.map((event) => {
      return (<EventItem event={event} key={event._id} remove={this.props.remove}/>)
    });
    return (
      <div className="event-list">{eventNode}</div>
    );
  }
};
 
export default EventList;