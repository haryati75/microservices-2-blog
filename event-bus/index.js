const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const events = [];

app.get('/events', (req, res) => {
    res.send(events);
});

app.post('/events', async (req, res) => {
    const event = req.body;
    console.log('Event Bus Received Event', event.type);

    events.push(event);

    // post generic event to all services
    const services = [
        'http://posts-clusterip-srv:4000/events',
        'http://comments-srv:4001/events',
        'http://query-srv:4002/events',
        'http://moderation-srv:4003/events'
    ];

    // Wait for all services to respond
    const results = await Promise.allSettled(
      services.map((url) => axios.post(url, event))
    );

    console.log('Rejected results:', results
      .filter(result => result.status === 'rejected')
      .map(result => result.value.data));
    console.log('Fulfilled results:', results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value.data));

    res.send({ status: 'OK' });
});

app.listen(4005, () => {
    console.log('Event bus listening on 4005');
});