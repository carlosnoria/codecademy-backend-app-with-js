const express = require('express');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./api/api');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(errorHandler());

app.use('/api', router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running and listening on port: ${PORT}`);
});

module.exports = app;