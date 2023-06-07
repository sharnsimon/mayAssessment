module.exports = (sequelize,DataTypes)=>{
    const Model = sequelize.define('student',{
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
        departmentId:{
            type:DataTypes.INTEGER
        },
        dob:{
            type:DataTypes.DATE
        }
    },{
        tableName:'student',
        timestamps:true,
        underscored:false
    });
    Model.associate = function(models){
        this.markdetails = this.hasMany(models.markdetails,{foreignKey:'studId'})
        this.departmentId = this.belongsTo(models.department)
    }

    return Model
}