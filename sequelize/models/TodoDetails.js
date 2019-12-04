'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoDetails = sequelize.define('TodoDetails', {
    content: DataTypes.STRING,
    todoId: DataTypes.INTEGER
  }, {});
  TodoDetails.associate = function(models) {
    // associations can be defined here
    TodoDetails.belongsTo(models.Todo)
  };
  return TodoDetails;
};