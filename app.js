// express server
const express = require('express');
// we import (require) the index.js file to our main app.js file so that it can be used with the express server
const router = require('./api-routes/index');
// middleware
const bodyParser = require('body-parser');
// middleware
const mongoose = require('mongoose');

// setup an express app
const app = express();

// connect to mongodb
// addiitonally it will create a datadb database for us
mongoose.connect('mongodb://localhost/peopledb');
// we set mongoose promise equal to global promise (nodejs) since mongoose version of promise is deprecated 
mongoose.Promise = global.Promise    

// the following is middleware
// note: the order of middleware matters

// body-parser middleware and the format in which we want it is .json()
app.use(bodyParser.json());

// in order for the express server to know and use the routes from the index.js file we use the app.use method
// with the '/api' parameter, we simplify our code so as to not have to type it in everytime we create a request in the index.js file
app.use('/api', router);

// error handler middleware
app.use((err, req, res, next) => {
    // we can output the error to the console, a webpage or to postman as we will be doing in this case
     res.status(422).send({error: err.message});
});
// end of middleware

// a simplifier way to initialize routes 
//app.use('/api', require('./api-routes/index'));
// then delete the router require line

// specify on which port to start the express server
app.listen(process.env.port || 3000, () => {
    console.log('Listening in on port 3000');
});