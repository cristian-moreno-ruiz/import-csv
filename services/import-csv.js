const fs = require('fs');
const csv = require('fast-csv');
const Vehicle = require('../models/vehicle');

const importCsv = (filePath, provider) => {
    let config = null;
    let items = [];
    
    return new Promise((resolve, reject) => {
        // Load configuration from provider
        try{
            config = require(`../config/${provider}.json`);
        } catch (err) {
            reject('Provider not found');
        }

        // Create Stream to process uploaded csv file
        fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: config.columns}))
        .on('data', (row) => {
            // Create an instance of Vehicle for each row
            items.push(new Vehicle(row))
        })
        .on('error', (error) => {reject('An error ocurred while processing CSV file')})
        .on('end', ()=> {
            // Insert rows in batch to increase efficiency
            Vehicle.insertMany(items)
            .then(resolve('Data Imported successfully'))
            .catch((error) => {
                console.log('Error inserting data into db: ', error);
                reject('An error ocurred while processing CSV file');
            })
        })
    });
}

module.exports = importCsv