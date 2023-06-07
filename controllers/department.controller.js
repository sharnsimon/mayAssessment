const Department = require('../models').department
const {ReE,ReS,to} = require('../global_functions')
const models= require('../models/index')
const Staff = require('../models').staff
const Student = require('../models').student
const Subject = require('../models').subject
const addDepartment= async function(req,res){
    let body =req.body;
    let [err,dept]= await to(Department.create({
        name:body.name
    }))
    if(err) return ReE(res,err,422)
    if(dept) return ReS(res,dept,200)
}
module.exports.addDepartment =addDepartment

const deleteDepartment =  async function(req,res){
    return await models.sequelize.transaction().then(async (transaction)=>{
        try{
            let[stafferr,staff]=await to(Staff.destroy({
                where:{
                    deptId:req.body.departmentId
                },
                transaction:transaction
            }));
            if(stafferr) return ReE(res,stafferr,422)
            let[studerr,student] = await to(Student.destroy({
                where:{
                    departmentId:req.body.departmentId
                },
                transaction:transaction
            }))
            if(studerr)return ReE(res,studerr,422)
            let[suberr,subject] = await to(Subject.destroy({
                where:{
                    deptId:req.body.departmentId
                },
            
                transaction:transaction
            }))
            if(suberr) return ReE(res,suberr,422)
            if(staff&&student&&subject){
                let [depterr,dept] = await to(Department.destroy(
                    {
                        where:{
                        id:req.body.departmentId
                    },
                    transaction:transaction
                }))
                if(depterr) return ReE(res,depterr,422)
                if(dept) await transaction.commit();
        }
    }
    catch(error){
    transaction.rollback();
    return ReE(res,error,422)

}
})
}