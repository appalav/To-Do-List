//aquaring mongoose
const mongoose = require('mongoose');

//defining the schema
const taskSchema = new mongoose.Schema({

    work: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    duedate: {
        type: String,
        required: true
    }
})


const Task = mongoose.model('Task', taskSchema);
//exporting or making it avaliable for different files
module.exports = Task;