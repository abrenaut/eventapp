# Prerequisites

* Docker
* Docker compose

# Usage

Start the app using docker-compose:

    git clone https://github.com/abrenaut/eventapp
    cd eventapp
    docker-compose up

And then access the UI by hitting [http://localhost:3000](http://localhost:3000) with a web browser.

The stack exposes the following ports:

* 3000: Web Client
* 3001: REST API
* 3002: Web Socket Server

## How can I create a new event?

    curl -H "Content-Type: application/json" -X POST -d '{"type": "eventType","serviceId": "abc", "data": "eventData"}' http://localhost:3001/events

## How can I get the list of existing events?

    curl -H "Content-Type: application/json" -X GET http://localhost:3001/events

## How can I delete an event?

    curl -H "Content-Type: application/json" -X DELETE http://localhost:3001/events/_eventID_

## How can I run the unit tests?

Launch a mongo instance:

    docker run --name events_mongo -d -p 27017:27017 mongo

Run the API tests:

    cd api
    npm test

# Directory Structure

## `/api`

Contains the REST API used for CRUD operations on the event database.

## `/client`

Contains the web client that lists stored events.

## `/ws`

Contains the Web Socket server used to updated the client in real time whenever an event is stored / deleted.