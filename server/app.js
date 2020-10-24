const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const {v4:uuidv4} = require ('uuid');

let trips= []

app.use(express.urlencoded())

// Setting up mustache as a templating engine
app.engine('mustache',mustacheExpress())

//the page are located in the views directory. Telling where our pages are located
app.set('views','./views')

//extension for all pages. Telling the all pages are extension of mustache
app.set('view engine', 'mustache')

//route
app.get('/trips',(req,res) => {
    res.render('trips', {allTrips:trips})
})

//POST ROUTE
app.post('/add-trips',(req,res) => {
    const title = req.body.title
    const date = req.body.date
   

    let trip= {tripId: uuidv4(),title: title, date: date}
    trips.push(trip)

    res.redirect('/trips')

})

//delete route
app.post('/delete-trip', (req,res) =>{
    
    const tripId = req.body.tripId

    trips = trips.filter(trip => {
        return trip.tripId != tripId
    
    })

    res.redirect('/trips')

})

//run the server localhost:3000
app.listen(3000, () => {
	console.log('server is running...')
})




