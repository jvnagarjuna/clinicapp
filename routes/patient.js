const express = require('express')
const router = express.Router()
const { check } = require('express-validator');

const {
    getPatientById,
    createPatient,
    getPatient,
    getAllPatients,
    updatePatient,
    removePatient,
    getPatientsByClinicIdAndAdmissionDateRange
} = require('../controllers/patient')

//params
router.param('patientId', getPatientById)

//create
router.post('/patient/create',
    [
        check('patient_name', 'Patient Name is required').not().isEmpty(),
        check('patient_description', 'Patient Descritpion is required').not().isEmpty(),
        check('patient_dob', 'Patient Date of birth is required').not().isEmpty(),
        check('patient_gender', 'Patient gender is required').not().isEmpty(),
        check('insurance_number', 'Insurance Number is required').not().isEmpty(),
        check('clinic_id', 'Clinic Id is required').not().isEmpty(),
        check('admission_date', 'Adminssion Date is required').not().isEmpty(),
        check('discharge_date', 'Discharge Date is required').not().isEmpty(),
        check('patient_name', 'Patient name should be at least 3 char').isLength({ min: 3 }),
        check('patient_description', 'Patient decription should be at least 10 char').isLength({ min: 10 }),
        check('patient_dob', 'Patient Date of birth is not valid date').isISO8601().toDate(),
        check('patient_gender', 'Gender should be at least 4 char').isLength({ min: 4 }),
        check('insurance_number', 'Insurance Number should be at least 10 char').isLength({ min: 10 }),
        check('clinic_id', 'Clinic ID should be at least 5 char').isLength({ min: 5 }),
        check('admission_date', 'Admission Date is not valid date').isISO8601().toDate(),
        check('discharge_date', 'Discharge Date is not valid date').isISO8601().toDate(),
    ],
    createPatient
)

//read
router.get('/patient/:patientId', getPatient)
router.get('/patients', getAllPatients)
router.post('/patientsByClinicIdAndAdmissionDateRange',
    [
        check('clinic_id', 'Clinic Id is required').not().isEmpty(),
        check('start_date', 'Start Date is required').not().isEmpty(),
        check('end_date', 'End Date is required').not().isEmpty(),
        check('start_date', 'Start Date is not valid date').isISO8601().toDate(),
        check('end_date', 'End Date is not valid date').isISO8601().toDate(),
    ],
    getPatientsByClinicIdAndAdmissionDateRange)

//update
router.put('/patient/:patientId', updatePatient)

//delete
router.delete('/patient/:patientId', removePatient)

module.exports = router;