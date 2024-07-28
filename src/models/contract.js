const {
    Model
  } = require('sequelize');
      module.exports = (sequelize, DataTypes) => {
    class Contract extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
        // Contract.belongsTo(models.Post, {  foreignKey: 'postId', as: 'posts' });
  
      }
    }
    Contract.init({
      userId: DataTypes.STRING,
      contractId: DataTypes.TEXT,
    }, {
      sequelize,
      modelName: 'Contract',
    });
    return Contract;
  };