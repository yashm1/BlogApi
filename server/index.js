const express = require('express')
var router = express.Router();
const app = express()
const port = 3001 // Setting the port number
const { Sequelize, Model } = require('sequelize');

// Making connection with database
const sequelize = new Sequelize('blogs', 'postgres', 'yash1234', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

// define the varaible blogs to access the database
var blogs = sequelize.define('blogs', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    body: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

// checking the connectivity

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });




app.use(express.json());

// Create the blog by passing the request
app.post('/blog', (req, res) => {
    const data = req.body;
    blogs.create(data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating blogs"
            });
        });
});

// read all the database

app.get('/read', function (req, res) {
    blogs.findAll().then(body => res.json(body));
});

// Making routes for all the pages

app.get('/read/:id', function (req, res) {
    blogs.findAll({ where: { id: req.params.id } }).then(body => res.json(body));
});

// Update the database
app.put('/read/:id', function (req, res) {
    const id = req.params.id;
    blogs.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Blog was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update blog  with id=${id}. Maybe blog was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating blog with id=" + id
            });
        });

});

// Delete from the database

app.delete('/read/:id', function (req, res) {
    blogs.destroy({
        where: { id: req.params.id }
    }).then(() => {
        console.log("Delete from the id : ", req.params.id);
    }).catch(function (err) {
        console.log("delete failed with error: " + err);

    });
});

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.listen(port, () => {
    console.log((`Example app listening at http://localhost:${port}`))
})