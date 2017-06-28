const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const models = require('./models')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.listen(3000, function () {
  console.log('listening on 3000')
})

app.get('/', function (req, res) {
  let incomplete = []
  let complete = []

  models.todos.findAll({
  }).then(function (todos) {
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].isCompleted === true) {
        complete.push(todos[i])
      } else {
        incomplete.push(todos[i])
      }
    }
  }).then(function () {
    res.render('index', {
      todos: incomplete,
      completedTodos: complete
    })
  })
})

app.post('/', function (req, res) {
  let taskName = req.body.task
  models.todos.create({
    taskName: taskName,
    isCompleted: false
  }).then(function () {
    res.redirect('/')
  })
})

app.post('/complete', function (req, res) {
  models.todos.update({
    isCompleted: true
  }, {
    where: {
      id: req.body.id
    }
  }).then(function () {
    res.redirect('/')
  })
})
