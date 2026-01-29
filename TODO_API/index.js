const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const path = "todos.json"

// Read todos from file safely
function readData() {
    try {
        if (!fs.existsSync(path)) return []
        const data = fs.readFileSync(path, 'utf8')
        if (data) return JSON.parse(data)
        return []
    } catch (err) {
        console.error("Error reading file:", err)
        return []
    }
}

// Save todos to file
function saveData(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

app.use(express.json())

// Root
app.get('/', (req, res) => res.send('Hello World!'))

// Get all todos
app.get('/todo', (req, res) => {
    let todos = readData()
    res.json(todos)
})

// Get todo by ID
app.get('/todo/:id', (req, res) => {
    let todos = readData()
    let todo = todos.find(t => t.id == req.params.id)
    if (!todo) {
        return res.status(404).json({
            message: "Data not found with id :" + req.params.id
        })
    }
    res.json(todo)
})

// Add new todo
app.post('/todo', (req, res) => {
    let todos = readData()
    const title = req.body.title
    if (!title) return res.status(400).json({ message: "Title is required" })

    const newTodo = {
        id: Date.now(),
        title: title,
        isCompleted: false
    }

    todos.push(newTodo)
    saveData(todos)
    res.status(201).json(newTodo)
})

// Update todo
app.put('/todo/:id', (req, res) => {
    let todos = readData()
    let ind = todos.findIndex((todo) => todo.id == req.params.id)

    if (ind == -1) {
        return res.status(404).json({
            message: "Data not found with id :" + req.params.id
        })
    }

    todos[ind].title = req.body.title || todos[ind].title
    saveData(todos)
    res.json({
        message: "Data updated with id :" + req.params.id,
        todo: todos[ind]
    })
})

// Delete todo
app.delete('/todo/:id', (req, res) => {
    let todos = readData()
    let ind = todos.findIndex((todo) => todo.id == req.params.id)

    if (ind == -1) {
        return res.status(404).json({
            message: "Data not found with id :" + req.params.id
        })
    }

    const deleted = todos[ind]
    todos = todos.filter((todo) => todo.id != req.params.id)
    saveData(todos)

    res.json({
        message: "Data deleted",
        todo: deleted
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
