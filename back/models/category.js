module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {  //categorys - table name
    // id가 기본적으로 들어있다.
    kinds: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Category.associate = (db) => {
    db.Category.hasMany(db.Post);
  };
  return Category;
};
