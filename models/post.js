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
        post_title: {
            type: DataTypes.STRING(1234)
        },

        post_content: {
            type: DataTypes.STRING(65000)
        }
    })
    return post;
}