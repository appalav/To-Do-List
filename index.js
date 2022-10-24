//acquired express 
const express = require('express');
//path is acquired
const path = require('path');
//defining the port 
const port = 8000;
// connecting to data base 
const db = require('./config/mongoose');
// connecting the schema which is defined
const Task = require('./models/task');
 
const app = express();
// viewengine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
// linking to the assets 
app.use(express.static('assets'));

// displaying the home page 
app.get('/home/todo', function(req, res){
    return res.render('home', {
        title: "ToDoo"
    });
});

// displaying the main hero page
app.get('/main/todo', function(req, res){
    Task.find({}, function(err, tasks){
        if(err){
            console.log("error in fetching tasks from db");
            return;
        }
        return res.render('main',{
            title: "Todoo",
            task_list: tasks
        });

    })
  
})
// posting the created task of the page 
app.post('/create-task', function(req, res){
    
    
    Task.create({
        work: req.body.work,
        category: req.body.category,
        duedate: req.body.duedate
    }, function(err, newTask){
        if(err){console.log('Error in creating a task!')
            return;}
            console.log('', newTask);
            return res.redirect('/main/todo');
    })
  

});
//listening to the port or checking if server is running on port 
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Server is running on Port', port);
})

// displaying the page after deleting the task 
app.get('/delete-task/', function(req, res){
    console.log(req.query);
    let id = req.query.id

    Task.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('/main/todo');
    }) 
});
