const {
  Model
} = require('sequelize');
    module.exports = (sequelize, DataTypes) => {
  class BookRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // BookRoom.belongsTo(models.Post, {  foreignKey: 'postId', as: 'posts' });

    }
  }
  BookRoom.init({
    userId: DataTypes.STRING,
    bookRoomId: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'BookRoom',
  });
  return BookRoom;
};