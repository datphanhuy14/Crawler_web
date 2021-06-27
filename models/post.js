'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  post.init({
    link: DataTypes.STRING,
    post_description: DataTypes.STRING,
    post_title: DataTypes.STRING,
    post_img: DataTypes.STRING,
    post_content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
    raw: true
  });
  return post;
};