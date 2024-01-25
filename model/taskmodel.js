var mongoose = require("mongoose");

var tasksechema = mongoose.Schema({
    status:{type:Number},
    name:{type:String},
    task_name:{type:String},
    u_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

module.exports = mongoose.model("task",tasksechema);