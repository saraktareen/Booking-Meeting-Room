const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

// Set up routes
app.use('/', routes);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// http://localhost:3000/book
// http://localhost:3000/availability?date=2023-01-01



