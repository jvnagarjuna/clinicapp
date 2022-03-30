const { startOfDay, endOfDay } = require('date-fns');
const Patient = require('../models/patient')
const { validationResult } = require('express-validator');

exports.getPatientById = (req, res, next, id) => {

    Patient.findById(id).exec((err, patient) => {
        if (err) {
            return res.status(400).json({
                error: 'Patient not found'
            })
        }
        req.patient = patient;
        next()
    })

}

exports.createPatient = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const patient = new Patient(req.body)

    patient.save((err, patient) => {
        if (err) {
            return res.status(400).json({
                error: 'Not able to save patient'
            })
        }

        return res.json(patient)
    })
}

exports.getPatient = (req, res) => {
    return res.json(req.patient)
}

exports.getAllPatients = (req, res) => {
    Patient.find().exec((err, patients) => {
        if (err) {
            return res.status(400).json({
                error: 'No Patients Found'
            })
        }
        res.json(patients)
    })
}

exports.getPatientsByClinicIdAndAdmissionDateRange = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }


    const clinicId = req.body.clinic_id;
    const startDate = new Date(req.body.start_date);
    const endDate = new Date(req.body.end_date);

    Patient.find(
        {
            clinic_id: clinicId,
            admission_date: {
                $gte: startOfDay(startDate),
                $lte: endOfDay(endDate)
            }
        }).exec((err, patients) => {
            if (err) {
                return res.status(400).json({
                    error: 'No Patients Found'
                })
            }
            res.json(patients)
        })
}

exports.updatePatient = (req, res) => {

    Patient.findByIdAndUpdate(
        { _id: req.patient._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, updatedPatient) => {
            if (err) {
                return res.status(400).json({
                    error: 'Failed to update a patient'
                })
            }
            return res.status(200).json(updatedPatient);
        }
    )
}

exports.removePatient = (req, res) => {
    const patient = req.patient;

    patient.remove((err, patient) => {
        if (err) {
            return res.status(400).json({
                error: 'Failed to delete this patient'
            })
        }
        res.json({
            message: 'successfully deleted'
        })
    })
}