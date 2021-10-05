module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Post', { // Mysql Table name : Posts  - 2021 10 04 ITwoo
    // id가 기본적으로 들어있다. - 2021 08 12 ITwoo
    content: { // Post 내용 - 2021 10 04 ITwoo
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Comment.associate = (db) => {
    db.Post.hasMany(db.Image); // 1:N Post:Image - 2021 10 04 ITwoo
    db.Post.belongsTo(db.Category) // 1:N Category:Post - 2021 10 04 ITwoo
    db.Post.belongsTo(db.User) // 1:1 Post:User - 2021 10 04 ITwoo
  };
  return Comment;
};
