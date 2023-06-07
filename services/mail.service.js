const nodemailer = require('nodemailer')
require('../config/config')
const {to,TE} = require('../global_functions')

const sendStaffMail = async function(toMail,mailContent,keyObjects){

    const sender = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:CONFIG.user,
            pass:CONFIG.pass
        },
        host:"smtp.gmail.com",
        port:465
    });

    for(let key in keyObjects){
        let replace = "%"+key+"%"
        let replaceRegExp = new RegExp(replace,'g')
        mailContent = mailContent.replace(replaceRegExp,keyObjects[key])
    }
    const composeMail = {
        from:"sharnjackson2002@gmail.com",
        to:toMail,
        subject:"Account Created",
        html:mailContent
    };

    let [err,mail] = await to(sender.sendMail(composeMail));
    if(err) return TE(err)
    return mail
}

module.exports.sendStaffMail=sendStaffMail