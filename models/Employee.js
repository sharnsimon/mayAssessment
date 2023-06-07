module.exports = (sequelize,DataTypes)=>{
    const Model = sequelize.define('employee',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        firstName:{
            type:DataTypes.STRING,
        },
        lastName:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING
        },
        address:{
            type:DataTypes.JSON
        }
    },{
        tableName:'employee',
        timestamps:true,
        underscored:false
    });
    return Model
}