const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const registrationRoutes = require('./routes/registration');

// Middleware
app.use(bodyParser.json());
app.use('/api/registration', registrationRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});