const Staff = require('../models').staff
const { sign } = require('crypto')
const {ReE,ReS,to} = require('../global_functions')
const Department = require('../models').department 
const Designation = require('../models').designation 
const Student  = require('../models').student
const mailService = require('../services/mail.service')
const fs = require('fs')
const addStaff = async function(req,res){
    let body=req.body;
    console.log('req',req.body);
    let [errr,details] = await to(Department.findOne({
        attributes:['id'],
        where:{
            name:req.body.departmentName
        }
        
    }))
    if(errr) return ReE(res,errr,422);
    let[deserr,design] = await to(Designation.findOne({
        attributes:['id'],
        where:{
            name:req.body.designationName
        }
    }))
    if(deserr) return ReE(res,deserr,422);
    if(details){
        let[err,staff] = await to(Staff.create({
            name:body.name,
            deptId:details.id,
            degnId:design.id,
            staffEmail:body.staffEmail,
            password:body.password,
            gender:body.gender,
            dob:body.dob
        }));
    if(err) return ReE(res,err,422)
    if(staff){
        const content = fs.readFileSync('./views/mail.html','utf8');
        let[errmail,staffMail] = await to(mailService.sendStaffMail(staff.staffEmail,content.toString(),{
            name:staff.name,
            deptId:staff.deptId,
            staffEmail:staff.staffEmail,
            gender:staff.gender,
            dob:staff.dob
        }));

        if(errmail) return ReE(res,errmail,422)
        if(staffMail) return ReS(res,staffMail,200)
    }

}
}
module.exports.addStaff=addStaff

const signIn = async function(req,res){
    staffDetail = {}
    let[err,staff] = await to(Staff.findOne({
        where:{
            staffEmail:req.body.staffEmail
        }
    }))
    if(err) return ReE(res,err,422)
    let [errr,token] = await to(staff.getJWT())
    if(errr)return ReE(res,errr,422)
    if(staff && token){
        staffDetail['staff']=staff,
        staffDetail['token']=token
    }
    if(staffDetail) return ReS(res,staffDetail,200)
}
module.exports.signIn = signIn


const staffDetails = async function(req,res){
    let[err,dept] = await to(Department.findOne({
        attributes:['id'],
        where:{
            name:req.body.departmentName
        },
        include:[{
            model:Staff,
            // where:{
            //     deptId:dept.id
            // },
            exclude:['staffEmail','password']
        },{
            model:Student,
            // where:{
            //     departmentId:dept.id
            // }
        }],
        
    }))
    if(err) return ReE(res,err,422)
    if(dept) return ReS(res,dept,200)
}
//     if(dept){
//         let [errr,staffdet] = await to(Staff.findAll({
//             exclude:['staffEmail','password'],
//             where:{
//                 deptId:dept.id
//             }
//         }))
//         if(errr) return ReE(res,errr,422)
//         let [errrr,studdet] = await to(Student.findAll({
//             where:{
//                 departmentId:dept.id
//             }
//         }))
//         if(errrr) return ReE(res,errrr,422)
//         if(staffdet&&studdet){
//             fullDetails['allStaffDetails'] = staffdet
//             fullDetails['allStudentDetails'] = studdet
//         }
//         if(fullDetails) return ReS(res,fullDetails,200)
//     }
// }
module.exports.staffDetails = staffDetails