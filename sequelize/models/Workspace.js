'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workspace = sequelize.define('Workspace', {
    name: DataTypes.STRING
  }, {});
  Workspace.associate = function(models) {
    // associations can be defined here
    Workspace.hasMany(models.Todo)
  };
  return Workspace;
};