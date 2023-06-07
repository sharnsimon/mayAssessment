var express = require('express')
var router = express.Router();
const passport = require('passport')
require('../middleware/passport')(passport)
const validate = require('../middleware/validate-schema')

/********CONTROLLER************/

let departmentController = require('../controllers/department.controller')
let designationController = require('../controllers/designation.controller')
let studentController = require('../controllers/student.controller')
let staffController = require('../controllers/staff.controller')
let subjectController = require('../controllers/subject.controller')
let markDetailsController = require('../controllers/markdetails.controller')
let employeeController =  require('../controllers/employee.controller');
const { employeeValidator } = require('../validator/employee.validator');

/*************INSERTING VALUES******************/

router.post('/addDepartment',departmentController.addDepartment);
router.post('/addDesignation',designationController.addDesignation);
router.post('/addStudent',studentController.addStudent);
router.post('/addStaff',staffController.addStaff);
router.post('/addSubject',subjectController.addSubject);
router.post('/addMark',markDetailsController.addMark);
router.post('/addEmployee',employeeValidator.addEmployee,validate.validate,employeeController.addEmployee)
router.post('/addBulkEmployee',employeeValidator.addBulkEmployee,validate.validate,employeeController.addBulkEmployee)
router.get('/getEmployee/:id',employeeValidator.getEmployee,validate.validate,employeeController.getEmployee)


/**************TOKEN GENERATION*************************************/

router.get('/signIn',staffController.signIn)


/*******************TOKEN AUTHENTICATION************************************************/

router.get('/check',passport.authenticate('jwt',{session:false}),function(req,res,next){
    res.send('done')
})

/*************GET VALUES***************/

router.get('/updateDesignation',designationController.updateDesignation)
router.get('/staffDetails',staffController.staffDetails)
router.get('/findStudents',studentController.findStudents)
router.get('/getStudentByMonth',studentController.getStudentByMonth)
router.get('/findMark',markDetailsController.findMark)
router.get('/sendStudentMail',studentController.sendStudentMail)
module.exports =router