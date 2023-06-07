module.exports = (sequelize,DataTypes)=>{
    const Model = sequelize.define('markdetails',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        studId:{
            type:DataTypes.INTEGER,        
        },
        subId:{
            type:DataTypes.INTEGER
        },
        mark:{
            type:DataTypes.INTEGER
        }

    },{
        tableName:'markdetails',
        timestamps:true,
        underscored:false
    });
    Model.associate= function(models){
        this.studId = this.belongsTo(models.student,{foreignKey:'studId'})
        this.subId = this.belongsTo(models.subject,{foreignKey:'subId'})
    }
    return Model
}