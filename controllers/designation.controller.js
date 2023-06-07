const Designation = require('../models').designation
const {ReE,ReS,to} = require('../global_functions')

const addDesignation = async function(req,res){
    let body = req.body;
    let[err,degn] = await to(Designation.create({
        name:body.name
    }))
    if(err)return ReE(res,err,422)
    if(degn) return ReS(res,degn,200)
}


module.exports.addDesignation =addDesignation


///INCOMPLETE
const updateDesignation = async function(req,res){
    let[err,upd] = await to(Designation.findOne({
        where:{
            name:req.body.degnname
        }
    }))
    if(err) return ReE(res,err,422)
    if(upd){
        let[errr,update] = await to(Designation.update(
            {name:req.body.degnname},
            {
                where:{
                    name:req.body.degnname
                }
            }))
            if(errr) return ReE(res,errr,422)
            if(update) return ReS(res,update,200)
    }
    else{
        let [errr,update] = await to(Designation.create(
            {
                name:req.body.degnname
            }
        ))
        if(errr) return ReE(res,errr,422)
        if(update) return ReS(res,update,200)
    }
}
module.exports.updateDesignation = updateDesignation



