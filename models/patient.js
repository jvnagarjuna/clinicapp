const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    patient_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    patient_description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },    
    patient_dob: {
        type: Date,
        required: true,
        trim: true,
        maxlength: 2000
    },
    patient_gender: {
        type: String,
        required: true,
        enum: [
            'Male',
            'Female'
        ]
    },
    insurance_number: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    clinic_id: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    admission_date: {
        type: Date,
        required: true,
        trim: true,
        maxlength: 255
    },
    discharge_date: {
        type: Date,
        required: true,
        trim: true,
        maxlength: 255
    },
    
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);