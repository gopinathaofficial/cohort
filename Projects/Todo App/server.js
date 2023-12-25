const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { throws } = require('assert');
let cors = require("cors");

const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.json());


const jsonData = () => {
    return new Promise((resolve, reject) => {
      fs.readFile('todos.json', 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };


  app.get('/todos',(req, res)=>{

    jsonData()
  .then(data => {
    res.json(JSON.parse(data));
  })
  .catch(err => {
    console.error(err);
  });

  })

  app.get('/todos/:id',(req, res)=>{
    jsonData()
  .then(data => {
    let parsedData = JSON.parse(data)
    let filteredTodo = parsedData.filter((n)=>n.id === req.body.id) 
    if(filteredTodo != -1){
      res.status(201).json(filteredTodo)
    } else {
      res.status(404).send()
    }
  })
  .catch(err => {
    console.error(err);
  });
  })

  app.post('/todos',(req,res)=>{
    const newTodos = {
      id: Math.floor(Math.random()*10000000000),
      title: req.body.title,
      description: req.body.description,
      isCompleted: req.body.isCompleted
    }

    jsonData()
    .then(data => {
      const parsedData = JSON.parse(data);
      parsedData.push(newTodos)
      fs.writeFile('todos.json',JSON.stringify(parsedData),(err)=>{
        if(err) throw err
        res.status(201).json(newTodos)
      })
    })
    .catch(err => {
      console.error(err);
    });

  })
  app.delete('/todos/:id', (req, res)=>{

     jsonData()
  .then(data => {
    let parsedData = JSON.parse(data)
    
    const todoIndex = parsedData.findIndex( t => t.id === req.body.id)
    if(todoIndex == -1){
      res.status(404).send()
    } else {
      parsedData.splice(todoIndex, 1)
      fs.writeFileSync("todos.json", JSON.stringify(parsedData))
      res.status(201).json(parsedData)
    }
  })
  .catch(err => {
    console.error(err);
  });

    
  })
  app.put('/todos/:id', (req, res)=>{
    jsonData()
    .then(data => {
      let parsedData = JSON.parse(data)
      const todoIndex = parsedData.findIndex( t => t.id === req.body.id)
  
      if(todoIndex == -1){
        res.status(404).send()
      } else {
        parsedData.splice(todoIndex, 1, req.body)
        fs.writeFileSync('todos.json', JSON.stringify(parsedData))
        res.status(201).json(parsedData)
      }
    })
    .catch(err => {
      console.error(err);
    });
  
    
  })



  app.listen(port, ()=>{
    console.log('server is running in'+ port)
  })
  
  module.exports = app;