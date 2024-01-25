var mongoose = require('mongoose')

var userschema = mongoose.Schema({
    u_id:{type:String ,unique: true, required: true},
    name:{type:String},
    email:{type:String},
    password:{type:String}
})

module.exports = mongoose.model("user",userschema);