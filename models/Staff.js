const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('../config/config')
const {to} = require('../global_functions')
const cryptoService = require('../services/crypto.service')
module.exports = (sequelize,DataTypes)=>{
    const Model = sequelize.define('staff',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
        },
        deptId:{
            type:DataTypes.INTEGER
        },
        degnId:{
            type:DataTypes.INTEGER
        },
        staffEmail:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        },
        gender:{
            type:DataTypes.STRING
        },
        dob:{
            type:DataTypes.DATE
        }
    },{
        tableName:'staff',
        timestamps:true,
        underscored:false
    });
    Model.beforeSave(async function(user,options){
        let err;
        if(user.changed('password')){
            let salt,hash;
            let rounds = crypto.randomInt(4,10);
            [err,salt]= await to(bcrypt.genSalt(rounds))
            if(err){
                console.log("err in adding salt")
            }
            [err,hash] = await to(bcrypt.hash(user.password,salt))
            if(err){
                console.log("err in hash")
            }
            user.password = hash
        }
    })

    Model.associate = function(models){
        this.deptId = this.belongsTo(models.department,{foreignKey:'deptId'});
        this.degnId = this.belongsTo(models.designation,{foreignKey:'degnId'});
        this.subject= this.hasMany(models.subject)
    }

    Model.prototype.getJWT = async function(){
        let err, encryptedToken;
        const token = "Bearer "+ jwt.sign({
            id:this.id,
            staffEmail:this.staffEmail,
            deptId:this.deptId,
            degnId:this.degnId
        },CONFIG.jwt_encryption,{expiresIn:CONFIG.jwt_expiration});
        [err,encryptedToken] = await to(cryptoService.encrypt(token));
        if(err) return TE(err);
        return encryptedToken;
    } 
 return Model
}