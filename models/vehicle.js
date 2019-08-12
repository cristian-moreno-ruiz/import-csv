const mongoose = require('mongoose');

// Schema
const vehicleSchema = new mongoose.Schema({
        uuid:  String,
        vin: String,
        make:   String,
        model: String,
        mileage: String,
        year: String,
        price: String,
        zip_code: String,
        create_date: String,
        update_date: String,
});

// Export model
module.exports = mongoose.model('Vehicle', vehicleSchema);