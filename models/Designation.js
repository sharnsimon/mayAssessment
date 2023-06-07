module.exports = (sequelize,DataTypes)=>{
    const Model = sequelize.define('designation',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
        }
    },{
        tableName:'designation',
        timestamps:true,
        underscored:false
    });
    Model.associate= function(models){
        this.staff = this.hasOne(models.staff,{foreignKey:'degnId'})
    }
    return Model
}