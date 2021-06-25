'use strict';
module.exports = (sequelize, DataTypes)=>{
    let post = sequelize.define('post', {
        id : {
            type : DataTypes.BIGINT,
            autoIncrement : true,
            primaryKey : true
        },
        link: {
            type: DataTypes.STRING
        },
        post_description :{
            type: DataTypes.STRING
        },
        post_title: {
            type: DataTypes.STRING
        },
        post_img: {
            type: DataTypes.STRING
        },
        post_content: {
            type: DataTypes.TEXT
        }
    })
    return post;
}