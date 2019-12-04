'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    content: DataTypes.STRING,
    workspaceId: DataTypes.INTEGER
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.Workspace)
    Todo.hasMany(models.TodoDetails)
  };
  return Todo;
};