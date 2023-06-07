const Subject = require('../models').subject

const {ReE, ReS, to} = require('../global_functions')

const addSubject = async function(req,res){
   let body = req.body;
    let [err,sub] = await to(Subject.create({
        deptId:body.deptId,
        staffId:body.staffId,
        subjectCode:body.subjectCode,
        subjectName:body.subjectName
    }))
    if(err) return ReE(res,err,422)
    if(sub) return ReS(res,sub,200)
}
module.exports.addSubject = addSubject