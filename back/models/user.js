module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {  // Mysql Table name : Users  - 2021 10 04 ITwoo
    // id가 기본적으로 들어있다. Mysql Table name : Categories  - 2021 09 13 ITwoo
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
  User.associate = (db) => {
    db.User.hasMany(db.Post); // 1:1 User:Post - 2021 10 04 ITwoo
  };
  return User;
};
