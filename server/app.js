const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { MongoClient, ObjectID } = require('mongodb')
const url = 'mongodb://localhost:27017/TodoApp'

const app = express()

// BodyParser Middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname+'/public'))

//CORSE
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,X-Request-With, Authorization");
    req.header('Access-Control-Allow-Methods',"GET, POST, PUT, DELETE");
    next();
});

app.get('/api/todos', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            return console.log('Unable to connect to database')
        }
        db.collection('Todos').find().toArray().then((todos) => {
            res.send(todos)
        }, (err) => {
            res.send('Unable to fetch products',err)
        })
        db.close()
    })    
})

app.post('/api/todos', (req, res) => {
    console.log('>>>>>post /api/todos',req.body)
    var _id = new ObjectID()
    var todoTxt = req.body.todoTxt
    var status = false

    MongoClient.connect(url, (err, db) => {
        db.collection('Todos').insertOne({
            _id, todoTxt, status
        },(err, result) => {
            if(err) {
                return res.status(400).send('Error')
            }
            res.send(result.ops[0])
        });
        db.close();
    });
})

app.delete('/api/todos/:id', (req, res) => {
	var id = req.params.id;
	MongoClient.connect(url, (err, db) => {
        if (err) {
            return console.log('Unable to connect to database')
        } 
        db.collection('Todos').findOneAndDelete({_id: new ObjectID(id)}).then((result) => {
            res.send(JSON.stringify(result, undefined, 2))
        }, (err) => {
            res.status(400).send('Unable to fetch todo',err)
        })
    
        db.close()
    });
});

app.patch('/api/todos/:id', (req, res) => {
    var id = req.params.id
    var status = req.body.status
    MongoClient.connect(url, (err, db) => {
        if (err) {
            return console.log('Unable to connect to database')
        }
        db.collection('Todos').findOneAndUpdate({
            _id:new ObjectID(id)
        }, {
            $set: {
                status: status
            }
        }, {
            returnOriginal: false
        }).then(result => {
            res.send(result)
        })
        db.close()
    })
})


app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app