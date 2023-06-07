const {body,check,param} = require('express-validator')


const employeeValidator = {
    addEmployee : [
        body('firstName').trim().notEmpty().withMessage('First name must not be empty'),
        body('firstName').isString().withMessage('First name must be a string'),
        body('lastName').trim().notEmpty().withMessage('Last name must not be empty'),
        body('lastName').isString().withMessage('Last name must be a string'),
        body('email').trim().isEmail().notEmpty().withMessage('Email should be in the format of abc@email.com'),
        body('address').isObject().withMessage('Address must be a JSON'),
        check('address.city').notEmpty().isString().withMessage('City name must be a string'),
        check('address.doorNumber').notEmpty().isNumeric().withMessage('Door number should be a number')
    ],
    addBulkEmployee : [
        body('data').notEmpty().isArray().withMessage('Bulk create should be in an array'),
        check('data.*.firstName').isString().trim().notEmpty().withMessage('First name must be a string'),
        check('data.*.lastName').isString().trim().notEmpty().withMessage('Last name must be a string'),
        check('data.*.email').trim().isEmail().notEmpty().withMessage('Email should be in the format of abc@email.com'),
        check('data.*.address').isObject().withMessage('Address must be a JSON'),
        check('data.*.address.city').notEmpty().isString().withMessage('City name must be a string'),
        check('data.*.address.doorNumber').notEmpty().isNumeric().withMessage('Door number should be a number')
    ],
    getEmployee:[
        param('id').notEmpty().isNumeric().withMessage('id must be number')
    ]
}

module.exports.employeeValidator = employeeValidator