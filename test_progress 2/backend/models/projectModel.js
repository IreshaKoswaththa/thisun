const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  file:{
    type:String,
    required:true
  },

  employeeId:{
    type:String,
    required:true
  },

  defaultTasks: {
    type: [{
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true,
        enum: ['To Do', 'In Progress', 'Done']
      }
    }],
    default: []
  }
},{timestamps:true})


module.exports = mongoose.model('Project',projectSchema)
