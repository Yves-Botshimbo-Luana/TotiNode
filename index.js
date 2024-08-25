const express = require('express')
const app = express()
const { Sequelize, DataTypes } = require('sequelize')
const TaskModel = require('./models/task')

const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage: 'my-database.db'
})
const nome = 'Membros';
const pessoas = [
    { nome: 'Maria' },
    { nome: 'João' },
    { nome: 'Ana' }
];

const tasks = TaskModel(sequelize, DataTypes)

app.set('view engine', 'ejs')

app.get ('/', (req, res) => {
    res.render('pessoas', {nome: nome, pessoas: pessoas});
});

app.get('/tarefa', async (req, res) =>{
    //const allTasks = await tasks.findAll()

    allTasks = await sequelize.query('SELECT * FROM Tasks')

    res.json ({ allTasks })
})

app.get('/tarefa/:id', async (req, res) =>{
    const taskId = req.params.id
    const task = await tasks.findByPk(taskId)

    res.render('tarefa', {id: task.id, name: task.name})
})

app.get ('/fotos', (req, res) => {
    res.render('fotos', { nome: req.query.nome})
})
app.get ('/cachorros', (req, res) => {
    res.end('<html><body><h1>Cheguei na rota dos cachorros</h1></body></html>')
})

app.get ('/pessoas', (req, res) => {
    res.render('pessoas', { nome: req.query.nome  || 'Membros', pessoas: pessoas   })
})

app.listen(9000, () => {
    console.log('Iniciando o servidor express')
})

//const http = require( 'http' )

//const server = http.createrServer((req, res) => {
    //if (req.method === 'GET') {
       // if (req.method === '/fotos') {
        //res.writeHead(200)
        //res.end('<html><body><h1>Cheguei na rota de fotos</h1></body></html>')
       // } else if (req.method === '/cachorros') {
           // res.writeHead(200)
           // res.end('<html><body><h1>cheguei na rota dos cachorros</h1></body></html>')
        //} else {
           // res.writeHead(404)
            //res.end('<html><body><h1>Nao encontrei uma rota!</h1></body></html>')
       // }
    //} else if (req.method === 'POST') {
        //res.writeHead(200)
       // res.end('Respondendo requisicao POST!')   
    //} else if (req.method === 'PUT') {
       // res.writeHead(200)
        //res.end('Respondendo requisicao PUT!')   
   // } else if (req.method === 'DELETE') {
        //res.writeHead(200)
        //res.end('Respondendo requisicao DELETE!')   
    //} else {
        //res.writeHead(400)
        //res.end(`Nao sei tratar esse metodo HTTP: ${req.method}`)   
    //} 
//})

//server.listen(9000)