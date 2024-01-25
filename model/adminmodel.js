var mongoose = require('mongoose')

var adminschema = mongoose.Schema({
    email:{type:String},
    password:{type:String}
})

module.exports = mongoose.model("admin",adminschema);