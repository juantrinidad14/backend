
const express = require('express')
const e = require('express')
const app = express()
const cors = require('cors')

//enable cors
app.use(cors())
//middleware to tell express to parse json
app.use(express.json())

//an array to hold todo items
let todos =[]


// return all todos
//Get  /todos
app.get('/todos', (req, res) =>{
    res.json(todos)
})

//create a new task
// post/ todos

app.post('/todos', (req, res) =>{
    let title = req.body.title
    let priority = req.body.priority
    let dateCreated = req.body.dateCreated


    // check if title, prioritym datecreated is not null
    if(title != null && priority != null & dateCreated != null) {
        let task= {title: title, priority: priority, dateCreate: dateCreated}
        todos.push(task)
        res.json({Success:true})
    } else {
        res.json({success: false, errorMessage: 'Unable to add task'})
    }

    console.log(req.body)

    res.send("TODO ITEM ADDED")
})

// run the server
app.listen(3000, () =>{
    console.log('Server is running')  
})