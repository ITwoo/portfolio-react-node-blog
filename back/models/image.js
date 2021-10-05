module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', { // MQSQL에는 Images 테이블 생성 - 2021 08 18 ITwoo
    // id가 기본적으로 들어있다. - 2021 08 18 ITwoo
    src: { // 이미지 주소 - 2021 10 04 ITwoo
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post); // 1:N Post: Image - 2021 10 04 ITwoo
  };
  return Image;
};
