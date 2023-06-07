module.exports = (sequelize,DataTypes)=>{
    const Model = sequelize.define('department',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING
        }
    },{
        tablename:'department',
        timestamps:true,
        underscored:false
    });
    Model.associate = function(models){
        this.staff = this.hasMany(models.staff,{foreignKey:'deptId'})
        this.student = this.hasMany(models.student)
        this.subject = this.hasMany(models.subject,{foreignKey:'deptId'})
    }
    return Model
}