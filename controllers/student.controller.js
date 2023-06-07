const Student = require('../models').student;
const {ReE,ReS,to} = require('../global_functions')
const Department = require('../models').department
const Markdetails = require('../models').markdetails
const Subject = require('../models').subject
const {Op} = require('sequelize');
const { sequelize } = require('../models');

const addStudent = async function(req,res){
    let body =req.body;
    let [err,student]=await to(Student.create({
        firstName:body.firstName,
        lastName:body.lastName,
        departmentId:body.departmentId,
        dob:body.dob
    }))
    if(err) return ReE(res,err,422)
    if(student) return ReS(res,student,200)
}
 module.exports.addStudent = addStudent


//INCOMPLETE

 const addStudentsBulk =async function(req,res){
    let body =  req.body;
    let[err,dept] = await to(Department.findOne({
        attributes:['id'],
        where:{
            name:body.departmentName
        }
    }))
    if(err) return ReE(res,err,422);
   
    if(dept){ 
        body.studentDetails.forEach((element)=>{
            element.departmentId = dept.id
        })
        let [err,stud] = await to(Student.bulkCreate(body.studentDetails))
       
        if(err) return ReE(res,err,422)
        if(stud) return ReS(res,stud,200)
    }
 }
 module.exports.addStudentsBulk = addStudentsBulk

const findStudents = async function(req,res){
    let[err,dept]= await to(Department.findOne({
        attributes:['id'],
        where:{
            name:req.body.departmentName
        }
    }))
    if(err) return ReE(res,err,422);
    if(dept){
        let[studerr,student] = await to(Student.findAll({
            where:{
                [Op.and]:[
                    {departmentId:dept.id},
                    {firstName:{[Op.startsWith]:'A'}}
                ]
            
            },
            limit:2

        }))
        if(studerr) return ReE(res,studerr,422)
        if(student) return ReS(res,student,200)
    }
}

module.exports.findStudents = findStudents

const getStudentByMonth = async function(req,res){
    let [err,data] = await to(Student.findAll({
        where:{

        [sequelize.fn('MONTH',sequelize.col('dob'))]:1
        }
    }))
    if(err) return ReE(res,err,422)
    if(data) return ReS(res,data,200)
}
module.exports.getStudentByMonth = getStudentByMonth

const sendStudentMail =  async function(req,res){
    let [err,mark] = await to(Markdetails.findAll({
        attributes:['subId','mark'],
        where:{
            studId:req.body.studentId
        }
    }))
    if(err) return ReE(res,err,422)
    if(mark){
        let sub={}
        let errr
        sub['mark']=mark.mark
        [errr,sub] = await to(Subject.findOne({
            attributes:['subjectName'],
            where:{
                id:mark.subId
            }            
        }))
        if(errr) return ReE(res,errr,422)
        if(sub) return ReS(res,sub,200)
    }
}
module.exports.sendStudentMail = sendStudentMail