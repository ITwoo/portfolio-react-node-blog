module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('User', { 
    // id가 기본적으로 들어있다.
    username: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Comment.associate = (db) => {
    db.User.hasMany(db.Post);
  };
  return Comment;
};
