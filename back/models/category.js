module.exports = (sequelize, DataTypes) => { 
  const Category = sequelize.define('Category', {  // Mysql Table name : Categories  - 2021 10 04 ITwoo
     // id가 기본적으로 들어있다. - 2021 08 25 ITwoo
    kinds: { // Category name - 2021 10 04 ITwoo 
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Category.associate = (db) => {
    db.Category.hasMany(db.Post); // 1:N Category: Post - 2021 10 04 ITwoo 
  };
  return Category;
};
