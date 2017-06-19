# Installation

    git clone https://github.com/abrenaut/eventapp
    cd eventapp
    docker-compose up -d

# Usage of the REST API

To create a new event:

    curl -H "Content-Type: application/json" -X POST -d '{"type": "eventType","serviceId": "abc", "data": "eventData"}' http://localhost:3001/events

To get the list of existing events:

    curl -H "Content-Type: application/json" -X GET http://localhost:3001/events

To delete an event:

    curl -H "Content-Type: application/json" -X DELETE http://localhost:3001/events/_eventID_
