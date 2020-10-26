const express = require('express')
const app = express() 
// initialize pg-promise library
const pgp = require('pg-promise')()

const connectionString = 'postgres://localhost:5432/mydatabase'

// initialize pg promise by using a connection string 
// pgp(...) returns an object which contains functions to interact with the database 
const db = pgp(connectionString)

const mustacheExpress = require('mustache-express')
app.use(express.urlencoded())

// tell express to use mustache templating engine
app.engine('mustache',mustacheExpress())
// the pages are located in views directory
app.set('views','./views')
// extension will be .mustache
app.set('view engine','mustache')

//router
app.get('/', (req, res) => {

    db.any('SELECT user_id, title, body, date_created, date_updated, is_published FROM post;')
    .then(post =>{
        res.render('index',{post:post})
    })

})


//Create Route
app.post('/create-dessert', (req,res) =>{

    const title = req.body.title
    const body = req.body.body

    

    db.none('INSERT INTO post(title, body) VALUES ($1,$2)',[title,body])
    .then(() => {
        res.redirect('/')
    
    })

})

//Delete Router

app.post('/delete-dessert',(req,res) => {
    const userId= req.body.userId

    

    db.none('DELETE FROM post WHERE user_id = $1;', [userId])
        .then(() => {
            res.redirect('/')
        })

})





app.listen(3000, () => {
    console.log('Server is running...')
})
