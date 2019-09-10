const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const figlet = require('figlet');
const chalk = require('chalk');
const errorhandler = require('errorhandler');
const morgan = require('morgan');


module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());
app.use(morgan('dev'));

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);
app.use(errorhandler());


// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, (err) => {
    if(err){
      console.log(`Error starting the server: ${err}`);
    }
    console.log(chalk.green(figlet.textSync('Boss Machine', {font: "Banner3"})));
    console.log(chalk.yellow('Powered By Carlos Noria.'))
    console.log(chalk.yellow(`Server running and listening on port: ${PORT}.`));
  })
}
