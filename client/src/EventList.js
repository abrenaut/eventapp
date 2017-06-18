import React from 'react';

import EventItem from './EventItem';

const columns = [
  {name:'_id', label: 'ID'},
  {name:'type', label: 'Type'},
  {name:'serviceId', label: 'Service ID'},
  {name:'data', label: 'Data'}
]

class EventList extends React.Component {
  constructor() {
    super();
    this.state = {
      sortBy: 'id',
      sortDir: 'DESC',
      filters: {},
      currentPage: 1,
      eventsPerPage: 10
    };
  }

  _handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  _handleSort(event) {
    this.setState({
      sortDir: this.state.sortDir === 'DESC' ? 'ASC' : 'DESC',
      sortBy: event.target.id
    });
  }

  _handleFilter(event) {
    const newFilters = Object.assign({}, this.state.filters);
    newFilters[event.target.name] = event.target.value;
    this.setState({
      filters: newFilters,
      currentPage: 1
    });
  }

  render() {
    const { currentPage, eventsPerPage, sortBy, sortDir, filters } = this.state;

    const headersComponent = columns.map((column, idx) => {var sortDirArrow = '';
      if (this.state.sortBy === column.name){
        sortDirArrow = this.state.sortDir === 'DESC' ? ' ↓' : ' ↑';
      }
      return (
          <th key={idx}>
            <span id={column.name} onClick={this._handleSort.bind(this)}>
              {column.label}{sortDirArrow}
            </span>
            <div>
              <input name={column.name} onChange={this._handleFilter.bind(this)}/>
            </div>
          </th>
        )
    });

    // Filter events
    const filtersCount = filters.lenght;
    const filteredEvents = this.props.events.filter(function(a) {
      let match = true;
      Object.keys(filters).forEach(function (key) {
        if(filters[key]) {
          match = match && a[key].indexOf(filters[key]) !== -1;
        }
      });
      return match;
    });

    // Sort events
    const sortedEvents = filteredEvents.sort(function(a, b) {
      if (a[sortBy] < b[sortBy])
        return sortDir === 'DESC' ? 1 : -1;
      if (a[sortBy] > b[sortBy])
        return sortDir === 'DESC' ? -1 : 1;
      return 0;
    });


    // Logic for displaying current page
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const eventsComponent = currentEvents.map((event) => {
      return (<EventItem event={event} key={event._id} remove={this.props.remove}/>)
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sortedEvents.length / eventsPerPage); i++) {
      pageNumbers.push(i);
    }

    const pageNumbersComponent = pageNumbers.map(number => {
      return (
        <li key={number}>
          <a className={number === currentPage ? "active" : "inactive"} href="#" id={number} onClick={this._handleClick.bind(this)}>
            {number}
          </a>
        </li>
      );
    });

    return (
      <div>
        <table>
            <thead>
            <tr>
              {headersComponent}
              <th></th>
            </tr>
            </thead>
            <tbody>
                {eventsComponent}
            </tbody>
        </table>
        <ul className="pageNumbers">
          {pageNumbersComponent}
        </ul>
      </div>
    );
  }
};
 
export default EventList;