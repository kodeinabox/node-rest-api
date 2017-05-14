// express server
const express = require('express');
// our router object/router handler and to make route requests (GET, POST..)
const router = express.Router()
// import data info from api-data.js file
const Data = require('../models/api-data');

// to get a data from the database
router.get('/people', (req, res, next) => {
    // sending a GET response
    res.send({type: 'GET'});
});

// add new data to the databse
// this is a route handler
router.post('/people', (req, res, next) => {
    // this piece of code will create a new instance of the data object locally and save it to the database  
    // .create is a mongoose method that helps us create a model(Data) using the information given to us by (req.body) and save it to the database
    // the .then() method will wait until the model is created and saved to the databse, then processes the functin(data)
    // which will parse the res.send(data) which responds to the user the info inputted. 
    Data.create(req.body).then((data) => {
        res.send(data);
        // the .catch and next (which is declared in the above function and in every other route request function just incase we may need an error handler) method states that once the previous operation is complete
        // move on to the next piece of middleware, which in this case it will be our error handler code
    }).catch(next);
});

// Updates existing data in the database.
// The colon before id menas that what ever id is stored in the database, it will trieve it 
// and it will be displayed on the url's browser.
router.put('/people/:id', (req, res, next) => {
    // sending a PUT response
    // and updating object by id
    Data.findByIdAndUpdate({_id: req.params.id}, req.body).then(() =>{
        Data.findOne({_id: req.params.id}).then((data) => {
            res.send(data);
        });
    });
});

// delete data in the databse from selected id
router.delete('/people/:id', (req, res, next) => {
    // sending a DELETE response
    Data.findByIdAndRemove({_id: req.params.id}).then((data) => {
        res.send(data);
    });
});

module.exports = router;
