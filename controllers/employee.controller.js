const Employee = require('../models').employee;
const {ReE,ReS,to} = require('../global_functions')



const addEmployee = async function(req,res){
    let body =req.body;
    let [err,employee]=await to(Employee.create({
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        address:body.address
    }))
    if(err) return ReE(res,err,422)
    if(employee) return ReS(res,employee,200)
}
module.exports.addEmployee = addEmployee

const addBulkEmployee = async function(req,res){
    let [err,emp] = await to(Employee.bulkCreate(req.body.data));
    if(err) return ReE(res,err,422);
    if(emp) return ReS(res,emp,200);
    // console.log(emp)
}

module.exports.addBulkEmployee = addBulkEmployee

const getEmployee = async function(req,res){
    console.log(req.params)
    let [err,getemp] = await to(Employee.findOne({
        where:req.params
    }));
    if(err) return ReE(res,err,422);
    if(getemp) return ReS(res,getemp,200)
}

module.exports.getEmployee = getEmployee