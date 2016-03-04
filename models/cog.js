/**
 * Created by orel- on 03/Mar/16.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var cogSchema = new mongoose.Schema({
    name: String,
    author: String,
    created: {type: Number, default: moment().format('x')},
    initialFile: {
        filename: {type: String, default: '#'},
        cogName: {type: String, default: 'untitled'}
    },
    updates: Array,
    githubLink: String,
    description: {type: String, default: "Custom cog for RED bot"},
    commands: {type: String, default: "Cog commands"},
    screenshots: Array
});


module.exports = mongoose.model('Cog', cogSchema);