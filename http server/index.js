const express = require('express')
const app = express()
const port  = 3000;

app.get('/', function(req, res){
    res.send('Hi lavde shilpa')
})

app.listen(port,function(){
    console.log(`port is running on ${port}`)
})