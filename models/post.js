'use strict';
module.exports = (sequelize, DataTypes)=>{
  let post = sequelize.define('post', {
    id : {
      type : DataTypes.BIGINT,
      autoIncrement : true,
      primaryKey : true
    },
    link: {
      type: DataTypes.STRING(1234)
    },
    post_description :{
      type: DataTypes.STRING(1234)
    },
    post_id : {
      type : DataTypes.STRING(1234)
    },
    post_title: {
      type: DataTypes.STRING(1234)
    },
    post_img: {
      type: DataTypes.STRING(1234)
    },
    post_content: {
      type: DataTypes.TEXT
    }
  })
  return post;
}
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class post extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   post.init({
//     link: DataTypes.STRING,
//     post_description: DataTypes.STRING,
//     post_title: DataTypes.STRING,
//     post_img: DataTypes.STRING,
//     post_content: DataTypes.STRING,
//     post_id : DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'post',
//     raw: true
//   });
//   return post;
// };