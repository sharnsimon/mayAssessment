module.exports = (sequelize,DataTypes)=>{
    const Model = sequelize.define('subject',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        deptId:{
            type:DataTypes.INTEGER
        },
        staffId:{
            type:DataTypes.INTEGER
        },
        subjectCode:{
            type:DataTypes.STRING
        },
        subjectName:{
            type:DataTypes.STRING
        }
    },{
        tableName:'subject',
        timestamps:true,
        underscored:false
    });
    Model.associate = function(models){
        this.markdetails = this.hasMany(models.markdetails,{foreignKey:'subId'})
        this.deptId = this.belongsTo(models.department,{foreignKey:'deptId'})
        this.staffId = this.belongsTo(models.staff)
    }
return Model
}