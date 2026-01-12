const express = require('express')
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  }
 

router.get('/', (req, res) => {
  res.send('Birds home page')
})
router.use(timeLog)
router.get('/sparrow', (req, res) => {
  res.send('Sparrow bird')
})
router.post('/add',(req,res) => {
    const name = req.body.name;
    res.send(`welcome ${name}`)
})
module.exports = router   
