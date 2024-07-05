const express = require('express')
const app = express()
const cors = require('cors')
const User = require('./models/mongoose.js')
const Exercise = require('./models/exercise.js')
require('dotenv').config()

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//create new user
app.post("/api/users", async(req, res)=>{
  let data = new User({
    username:req.body.username
  })
  try{
    const user = await data.save()
    res.send(user)
  }catch(err){
    console.log(err)
  }
})
app.get("/api/users", async(req, res)=>{
  let users = await User.find()
  res.send(users)
})




let Id
let Username

let loog


app.post("/api/users/:_id/exercises", async(req, res)=>{
  let {description,duration,date}=req.body;
  Id = req.params._id
try{
  const foundUser = await User.findById(Id)
  Username = foundUser.username
    if(!foundUser){
      console.log("user not found")
    }
    else{
    let exerciseObj = await Exercise({
      userid:Id,
      username:foundUser.username,
      description,
      duration: parseInt(duration),
      date: date ? new Date(date) : new Date
    })
    exercise = await exerciseObj.save()
    res.json({
      _id:Id,
      username:foundUser.username,
      description:exercise.description,
      duration:exercise.duration,
      date: new Date(exercise.date).toDateString()
    })
  }
}catch(err){
  console.log(err);
  res.send("There was an error saving the exercise")
}
  
  
  
})


//add new exercise for this user

// get log of all users excercises
app.get("/api/users/:_id/logs", async(req, res)=>{
  Id = req.params._id
  const foundUser = await User.findById(Id)
  console.log(foundUser)
  if(!foundUser){
    console.log("no user found")
  }
  else{
  Username = foundUser.username
  let {from,to,limit} = req.query
  let dateObj = {}
  if(!limit){
    limit = 100
  }
  if(from){
    dateObj["$gte"] = new Date(from)
  }
  if(to){
    dateObj["$lte"] = new Date(to)
  }
  let filter = { Id }
  if(from || to){
    filter.date = dateObj
  }

  const exercises = await Exercise.find({userid: Id}).limit(limit)
  const log = exercises.map(e => ({
    description: e.description,
    duration: e.duration,
    date: e.date = new Date(e.date).toDateString()
  }))
  res.json(
    {
      username:Username,
      count: exercises.length,
      _id: Id,
      log
    }
  )
  }
})






const listener = app.listen(3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
/*
app.post("/api/users/:_id/exercises", async(req, res)=>{
  let {description,duration,date}=req.body;
  Id = req.params._id
  if(Id.length != 24){
    console.log("id must be 24 characters long")
  }
  else{
  const foundUser = await User.findById(Id)
  Username = foundUser.username
    if(!foundUser){
      console.log("user not found")
    }
    if (!date){
      date = new Date()
    }
    else{
      date = new Date(date)
    }
    let exercise = await Exercise.create({
      username:foundUser.username,
      description,
      duration,
      date,
      userid:Id
    })
    res.send({
      username:foundUser.username,
      description:description,
      duration:duration,
      date:date.toDateString(),
      _id:Id
    })
  }
})
*/