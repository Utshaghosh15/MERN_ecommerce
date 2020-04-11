const express = require('express');
const port = 3000;

const app = express();

const admin = (req, res) => {
  res.send('Admin Dashboard')
}

const isLoggedIn = (req, res, next) => {
  console.log('is Logged');
  next()    
}

const isAdmin = (req, res, next) => {
    console.log('Is Verified Admin');
    next()
}

app.get("/admin", isLoggedIn, isAdmin, admin);

app.get("/", (req,res) => {
    res.send('Hello There');
})

app.listen(port,() => console.log(`Server is running at ${port}`));