import React from 'react';

class EventItem extends React.Component {
  _handleRemove(){
    this.props.remove(this.props.event._id)
  }

  render() {
    return (
      <tr>
        <td>{this.props.event._id}</td>
        <td>{this.props.event.type}</td>
        <td>{this.props.event.serviceId}</td>
        <td>{this.props.event.data}</td>
        <td><i className='close' onClick={this._handleRemove.bind(this)}>&times;</i></td>
      </tr>
    );
  }
};
 
export default EventItem;