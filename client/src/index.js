import React from 'react';
import { render } from 'react-dom';
import './index.css';
import io from 'socket.io-client'

import EventList from './EventList';
import Title from './Title';

let socket = io(process.env.REACT_APP_WS_URL)

class EventApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    // Request the list of events to the WebSocket Server
    socket.emit('client:getEvents');

    // Handle events emitted by the WebSocket Server
    socket.on('server:eventDeleted', data => {
      this._removeEvent(data._id);
    });
    socket.on('server:eventCreated', data => {
      this._addEvent(data);
    });
    socket.on('server:newEvents', data => {
      if (data) {
        this.setState({events: JSON.parse(data)}); 
      }
    });
  }

  _handleRemove(_id) {
    // Send a "deleteEvent" event to the WebSocket server and remove the event from the interface
    socket.emit(`client:deleteEvent`, {'_id': _id});
    this._removeEvent(_id);
  }

  _removeEvent(_id) {
    const newEvents = this.state.events.filter((event) => {
      return event._id !== _id;
    });
    this.setState({events: newEvents})
  }

  _addEvent(event) {
    const newEvents = this.state.events.slice();
    newEvents.push(event)
    this.setState({events: newEvents})
  }

  render(){
    return (
      <div>
        <Title eventCount={this.state.events.length}/>
        <EventList
          events={this.state.events}
          remove={this._handleRemove.bind(this)}
        />
      </div>
    );
  }
}

render(<EventApp />, document.getElementById('container'));
