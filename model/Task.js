const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

let TaskSchema= new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  isCompleted:{
    type:Boolean,
    default:false,
  }
});

TaskSchema.plugin(timestamp);

module.exports= mongoose.model("Task", TaskSchema,'tasks');
