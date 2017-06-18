To store the data I chose a document-oriented (NoSQL) database.
Those database are a good fit to store plain events....
The data is stored using LokiJS, a document-oriented datastore for node.js. I think a NoSQL database is perfect to store
plain events because there's no relations 

Pagination, sorting and filtering of the events is done on the client side.

If the list of events gets too important, we would have to do those operations on the server side.
This adds a lot of constraints because when an element is added/deleted we would have to compute to which page this element 
belongs to and send a refreshed version of this page to the clients currently viewing it.
To do so we could create one channel per currently viewed page and only emit the event on the channel corresponding to the
page being updated.
If we add sorting and filtering to the mix, we have to keep in mind that an element can belong to _x_ pages, _x_ being the
number of available sorting / filtering combinations.

The WebSockets and REST API live on the same server. It might be worth it separating them on two servers to scale them
separately.

http://4dev.tech/2016/03/tutorial-sorting-and-filtering-a-reactjs-datatable/
https://codepen.io/PiotrBerebecki/pen/pEYPbY

curl -H "Content-Type: application/json" -X POST -d '{"type": "click","serviceId": "abc", "data": "eventData"}' http://localhost:3001/events
curl -H "Content-Type: application/json" -X GET http://localhost:3001/events
curl -H "Content-Type: application/json" -X DELETE http://localhost:3001/events/eventID