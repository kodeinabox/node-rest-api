const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create data schema and model
// we also specifiy the structure of our schemas adding error handling validation
// if the fields we require are not met then the user recieves an error message
const DataSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    status: {
        type: String,
    },
    age: {
        type: Boolean,
        default: false
    }
    // add in geo location

});

// here mongoose will create a collection in mongodb
// a collection is similar to what tables are in SQL RDB
// furthermore the data gets pluralized by mongo
const Data = mongoose.model('data', DataSchema)

module.exports = Data;
  
