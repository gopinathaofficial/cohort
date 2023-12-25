/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const bodyParser = require('body-parser');
  const fs = require('fs');

  const mongoose = require("mongoose");
  const { MongoClient } = require('mongodb');
  const client = new MongoClient('mongodb+srv://gopinath9teen98:pdrJivmoytgmtHHm@cluster0.ynio3.mongodb.net/')

  client.connect()
    .then(() => console.log('Connected Successfully'))
    .catch(error => console.log('Failed to connect', error))

    mongoose.connect('mongodb+srv://gopinath9teen98:pdrJivmoytgmtHHm@cluster0.ynio3.mongodb.net/')
    const todoSchemaS = new mongoose.Schema({
      id: Number,
      title: String,
      description:String,
      isCompleted: Boolean,
  })
  const TodoSchema = mongoose.model('Todo', todoSchemaS)
  
  const app = express();
  const port = 3000;
  const todos = [];
  app.use(bodyParser.json());

  app.get('/todos',(req, res)=>{
    TodoSchema.find({})
        .then(docs => {
            console.log(docs)
            res.json(docs)
        })
        .catch(err => console.log(err))
  })

  app.get('/todos/:id',(req, res)=>{
        let filteredTodo = todos.filter((n)=>n.id === req.body.id) 
        
        TodoSchema.findOne({id:req.body.id}).then((data)=>{
          if (data) res.status(201).json(data)
          else res.status(404).send()
        })
  })

  app.post('/todos',(req,res)=>{
    const newTodos = {
      id: Math.floor(Math.random()*10000000000),
      title: req.body.title,
      description: req.body.description,
      isCompleted: req.body.isCompleted
    }
    todos.push(newTodos)
    const todo = new TodoSchema({
      id: Math.floor(Math.random()*10000000000),
      title: req.body.title,
      description: req.body.description,
      isCompleted: req.body.isCompleted
  });
  todo.save().then(doc => {
    res.send(doc)
})
.catch(err => console.log(err))
  })
  app.delete('/todos/:id', (req, res)=>{
    console.log(req.body.id)
    const todoIndex = todos.findIndex( t => t.id === req.body.id)
TodoSchema.deleteOne({id:req.body.id}).then((data, err)=>{
 if (err) res.status(404).send()
 else res.status(201).json(data)
})
    
  })
  app.put('/todos/:id', (req, res)=>{
    const todoIndex = todos.findIndex( t => t.id === req.body.id)
      TodoSchema.updateOne({id:req.body.id},  {
        $set:
            { 
              id:req.body.id,
              title:req.body.title,
              description: req.body.description,
              isCompleted: req.body.isCompleted
             }
    }).then((data, err)=>{
      if (err) res.status(404).send()
      else res.status(201).json(data)
     })
    
  })


  //using json

  // const jsonData = () => {
  //   return new Promise((resolve, reject) => {
  //     fs.readFile('todos.json', 'utf-8', (err, data) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(data);
  //       }
  //     });
  //   });
  // };


  // app.get('/todos',(req, res)=>{

  //   jsonData()
  // .then(data => {
  //   res.json(JSON.parse(data));
  // })
  // .catch(err => {
  //   console.error(err);
  // });

  // })

  // app.get('/todos/:id',(req, res)=>{
  //   jsonData()
  // .then(data => {
  //   let parsedData = JSON.parse(data)
  //   let filteredTodo = parsedData.filter((n)=>n.id === req.body.id) 
  //   if(filteredTodo != -1){
  //     res.status(201).json(filteredTodo)
  //   } else {
  //     res.status(404).send()
  //   }
  // })
  // .catch(err => {
  //   console.error(err);
  // });
  // })

  // app.post('/todos',(req,res)=>{
  //   const newTodos = {
  //     id: Math.floor(Math.random()*10000000000),
  //     title: req.body.title,
  //     description: req.body.description,
  //     isCompleted: req.body.isCompleted
  //   }

  //   jsonData()
  //   .then(data => {
  //     const parsedData = JSON.parse(data);
  //     parsedData.push(newTodos)
  //     fs.writeFile('todos.json',JSON.stringify(parsedData),(err)=>{
  //       if(err) throw err
  //       res.status(201).json(newTodos)
  //     })
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });

  // })
  // app.delete('/todos/:id', (req, res)=>{

  //    jsonData()
  // .then(data => {
  //   let parsedData = JSON.parse(data)
    
  //   const todoIndex = parsedData.findIndex( t => t.id === req.body.id)
  //   if(todoIndex == -1){
  //     res.status(404).send()
  //   } else {
  //     parsedData.splice(todoIndex, 1)
  //     fs.writeFileSync("todos.json", JSON.stringify(parsedData))
  //     res.status(201).json(parsedData)
  //   }
  // })
  // .catch(err => {
  //   console.error(err);
  // });

    
  // })
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