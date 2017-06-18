import React from 'react';

class EventItem extends React.Component {
  handleRemove(){
    this.props.remove(this.props.event._id)
  }

  render() {
    return (
      <li className="event">
        <label>
          {this.props.event.type}
        </label>
        <button className="remove" onClick={this.handleRemove.bind(this)} />
      </li>
    );
  }
};
 
export default EventItem;