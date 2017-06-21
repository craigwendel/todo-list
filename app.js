const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.listen(3000, function () {
  console.log('listening on to-do list')
})

const todos = []
const completedTodos = []

app.get('/', function (req, res) {
  res.render('index', { todos: todos, completedTodos: completedTodos })
})

app.post('/', function (req, res) {
  todos.push(req.body.task)
  res.redirect('/')
})
app.post('/complete', function (req,res){
  const pop = req.body.task
  todos.splice(todos.indexOf(pop), 1)
  completedTodos.push(pop)
  res.redirect('/')
})
