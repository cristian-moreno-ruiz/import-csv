const express = require('express')
const multer = require('multer');
const importCsv = require('./services/import-csv');
const Database = require('./models/Database');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Start MongoDB memory server
const mongod = new MongoMemoryServer();
mongod.getConnectionString()
// Create db connection
.then((url) => {new Database(url)}); 

// Initialize server variables and middleware to process upload files
const server = express()
const port = 3000
const upload = multer({dest: 'uploads/'});

// Routes
server.get('/', (req, res) => res.send('Express Running'))
server.post('/import-csv', upload.single('file'), (req, res) => {
    importCsv(req.file.path, req.body.provider)
    .then((value) => {res.send(value)})
    .catch((error) => {
        res.status(400);
        res.send(error)
    })
})

// Start server in port 3000
server.listen(port, () => console.log(`Running server in port ${port}!`))