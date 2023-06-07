const Markdetails = require('../models').markdetails
const Department = require ('../models').department
const Subject  = require('../models').subject
const {ReE,ReS,to} = require('../global_functions')
const { sequelize } = require('../models')
const {Op} = require('sequelize')

const addMark = async function(req,res){
    let body = req.body;
    let[err,mark] = await to(Markdetails.create({
        studId:body.studId,
        subId:body.subId,
        mark:body.mark
    }))
    if(err) return ReE(res,err,422)
    if(mark)return ReS(res,mark,200)
}
module.exports.addMark = addMark

const findMark = async function(req,res){
    let[erre,dept] = await to(Department.findOne({
        attributes:['id'],
        name:req.body.departmentName
    }))
    if(erre) return ReE(res,erre,422)
    if(dept){
        let[errr,subject] = await to(Subject.findOne({

            attributes:['id'],
            where:{
                [Op.and]:[{subjectName:req.body.subjectName},{deptId:dept.id}]
        }}))
        if(errr) return ReE(res,errr,422)
        if(subject){
            let[errrr,mark] = await to(Markdetails.findOne({
                attributes:[[sequelize.fn('AVG',sequelize.col('mark')),'average'],
                [sequelize.fn('MIN',sequelize.col('mark')),'min'],
                [sequelize.fn('MAX',sequelize.col('mark')),'max']],
                where:{
                    subId:subject.id
                }
            }))
            if(errrr) return ReE(res,errrr,422)
            if(mark) return ReS(res,mark,200)
        }
    } 
}

module.exports.findMark = findMark