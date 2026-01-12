const express = require('express')
const router = express.Router()

router.post('/add', (req, res) => {
  const { name, dob } = req.body

  if (!dob) {
    return res.status(400).send('DOB is required')
  }

  const birthDate = new Date(dob)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  if (age >= 18) {
    res.send(`${name || 'User'} is Eligible`)
  } else {
    res.send(`${name || 'User'} is Not Eligible`)
  }
})

module.exports = router
