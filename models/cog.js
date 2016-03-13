/**
 * Created by orel- on 03/Mar/16.
 */
var mongoose = require('mongoose');
var moment = require('moment');

//Cog mongoose schema
var cogSchema = new mongoose.Schema({
    name: String,
    fullName: String,
    author: String,
    created: {type: Number, default: moment().format('x')},
    githubLink: String,
    description: {type: String, default: "Custom cog for RED bot"}
});


module.exports = mongoose.model('Cog', cogSchema);