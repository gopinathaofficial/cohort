const express = require ('express')

const app = express()

app.use(express.json())

let user = [{
    name:'shilpa',
    kidneys:[{
        healthy: false
    },
    {
        healthy: true
    },
    {
        healthy: true
    }]
}]

app.get('/', function(req, res){
   let johnsKidney = user[0].kidneys,
   kidneyLength =  user[0].kidneys.length,
    healthyKidney = user[0].kidneys.filter(n=> n.healthy === true ).length,
    unHealthyKidney = user[0].kidneys.filter(n=> n.healthy === false ).length;

    res.json({
        kidneyLength,
        healthyKidney,
        unHealthyKidney
    })

//    res.send('User: '+ user[0].name+ " have "+kidneyLength + " kidney and "+ healthyKidney.length+ " of them are healthy") 
})

app.post('/', function(req, res){
  let isHealthy = req.body.isHealthy

  user[0].kidneys.push({
    healthy : isHealthy
  })

  res.json({
    msg:"Done"
  })
})

app.put('/', function(req, res){
   let unhealthyKidney = user[0].kidneys.filter(n => n.healthy === false);

   if(unhealthyKidney.length>0){
       user[0].kidneys.map(n => n.healthy = true) 
       res.json({
         msg:"Done"
       })
   } else {
    res.status(411)
    .send('All Kidney is healthy')
   }

})

app.delete('/', function(req, res){
   let healthyKidney = user[0].kidneys.filter(n => n.healthy === true),
   unhealthyKidney = user[0].kidneys.filter(n => n.healthy === false);

   if (unhealthyKidney.length>0 ) {
       user[0].kidneys = healthyKidney = user[0].kidneys.filter(n => n.healthy === true)
   } else {
    res.status(411)
    .send('No UnHealthy Kidney')
   }
   res.json({
    msg:"Done"
  })
})



app.listen(3000)