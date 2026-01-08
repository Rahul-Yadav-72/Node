const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', (req, res) => res.send('From post'))
app.put('/',(req,res) => res.send('From Put '))
app.delete('/',(req,res) => res.send('From Delete '))
app.patch('/',(req,res) => res.send('From Pach'))
app.head('/',(req,res) => res.send('From Pach'))
app.get('/uni', (req, res) => res.send('Welcome to RKU!!'))
app.get('/student', (req, res) => res.send({

    name:"Rahul Kumar Yadav",
    city:"Siwan",
    sem: 6,
    div: 'c',
    branch: 'CE'

}
))
app.get('/example/b', (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
  }, (req, res) => {
    res.send('Hello from B!')
  })
  
app.get('/myname/:fname/:lname',(req,res) => res.send(
    `Welcome ${req.params.fname} ${req.params.lname}`
))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))