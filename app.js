const express = require('express')
const app = express()
const mustacheExpress= require('mustache-express')

// setting up mustache as a templating engine 
app.engine('view engine', mustacheExpress())

// the pages are located in the views directory
app.set('views','./views')

// extension for all the pages 
app.set('views engine', 'mustache')

//render index.mustache page for the root (/) route 
app.get('/',(req,res) => {
    res.render('index')

}) 

// run the server
app.listen(3001, () => {
    console.log('Server is running...')
})