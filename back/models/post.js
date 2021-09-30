module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Post', { 
    // id가 기본적으로 들어있다.
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Comment.associate = (db) => {
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Category)
    db.Post.belongsTo(db.User)
  };
  return Comment;
};
