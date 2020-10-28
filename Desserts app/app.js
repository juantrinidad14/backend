const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
// initialize pg-promise library
const pgp = require('pg-promise')()
const bodyParser = require('body-parser')
const { urlencoded } = require('express')
const bcrypt = require('bcrypt')
const connectionString = 'postgres://localhost:5432/dessertsdb'
const SALT_ROUNDS = 10

// initialize pg promise by using a connection string
// pgp(...) returns an object which contains functions to interact with the database
const db = pgp(connectionString)

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded())

// tell express to use mustache templating engine
app.engine('mustache',mustacheExpress())
// the pages are located in views directory
app.set('views','./views')
// extension will be .mustache
app.set('view engine','mustache')

//add post route

app.get('/users/add-article',(req,res) => {
    res.render('add-article')
  })
  

  app.post('/users/add-article',(req,res) => {

    let title = req.body.title
    let description = req.body.description
    let userId = req.session.user.userId
  
    db.none('INSERT INTO articles(title,body,userid) VALUES($1,$2,$3)',[title,description,userId])
    .then(() => {
      res.send("SUCCESS")
    })
  
  })

//registration route
app.post('/register',(req,res) =>{
    let username = req.body.username
    let password = req.body.password

    db.oneOrNone('SELECT userid FROM users WHERE username =$1', [username])
    .then((user) => {
        if(user) {
            res.render('register',{message: "User name already exists!"})
        } else {
            // inster user into the users table
            
            db.none('INSERT INTO users(username,password) VALUES($1,$2)',[username,password])
            .then(() => {
                res.send('SUCCESS')
            })
        }
    })

})
//Route Login

app.post('/login',(req,res) =>{

    let username = req.body.username
    let password = req.body.password
    db.oneOrNone('SELECT userid,username,password FROM users WHERE username = $1',[username])
    .then((user) => {
        if(user) { // check for user's password
  
        bcrypt.compare(password,user.password,function(error,result){
          if(result) {
            res.send("SUCCESS!")
          } else {
              res.render('login',{message: "Invalid username or password!"})
          }
        })
  
      } else { // user does not exist
        res.render('login',{message: "Invalid username or password!"})
      }
    })
  
  })


app.get('/login', (req,res) => {
    res.render('login')
})

app.get('/register',(req,res) =>{
    res.render('register')
})


//Run the server

app.listen(3001, ()  => {
	console.log('Server is running')
})
