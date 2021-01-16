const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost:3000/';
const app= express();
const taskRouter = require('./routes/Task.js');
const mongoose = require('mongoose');
require('dotenv').config()


mongoose.connect(
  `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.z3epj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, (err) => {
        if(err) throw err;
        console.log('connected mongodb');
  });



  app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(  express.static(path.join(__dirname,"public")) );
app.use("/", express.static(path.join(__dirname,"public"))  );
app.use("/api/task", taskRouter  );






app.listen(PORT,() =>  console.log(`server listening on ${HOST} ${PORT}`) )
