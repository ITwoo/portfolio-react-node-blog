/* 게시글 관련 라우터 - 2021 10 04 ITwoo */
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const { Post, Image, Category, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try { // uploads 폴더 확인 및 생성코드 - 2021 10 04 ITwoo
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.')
  fs.mkdirSync('uploads');
}

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'uploads',
//     format: async (req, file) => {
//       const ext = path.extname(file.originalname);
//       return ext;
//     },
//     public_id: (req, file) => 'techblog'
//   }
// })

const storage = multer.diskStorage({ // multer를 사용해 이미지 업로드 - 2021 10 04 ITwoo
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, basename + '_' + new Date().getTime() + ext);
  }
})

const upload = multer({
  storage: storage
});

// router.get('/', (req, res, next) => {
//   res.send('hello post')
// });

router.post('/write', isLoggedIn, async (req, res, next) => { //글 쓰기  - 2021 09 04 ITwoo
  const data = req.body.content; // 데이터 받는 부분 
  const ctgr = req.body.category;
  console.log(req.body);
  const index = data.indexOf("<img"); // 이미지 부분 추출
  const start = data.indexOf('src="', index + 1);
  const end = data.indexOf('"', start + 6);
  var list = data.substring(start + 5, end);
  const post = await Post.create({
    content: data,
    UserId: req.user.id,
  });
  if (index !== -1) {
    const image = await Image.create({ src: list });
    await post.addImages(image);
  } else {
    const image = await Image.create({ src: 'https://via.placeholder.com/250x150/00CED1/000000' });
    await post.addImages(image);
  }
  const [category, created] = await Category.findOrCreate({
    where: { kinds: ctgr },
  })
  console.log(category)
  console.log(created)
  await category.addPost(post);
  const fullPost = await Post.findAll({ //글 db에 넣은후 응답
    include: [{
      model: Image
    }, {
      model: Category
    }],
    order: [['id', 'DESC']]
  });
  // const fullPost = await Post.findAll();  
  res.status(201).json(fullPost);
});

router.get('/content/:id', async (req, res, next) => { //read one
  console.log(req.params.id)
  const post = await Post.findOne({
    where: { id: req.params.id },
    include: [{
      model: Image
    }, {
      model: Category
    }]
  });
  // console.log(fullPost)
  res.status(201).json(post);
});

router.get('/contents', async (req, res, next) => { //read many
  // if(req.body.id === 0){
  //   where = {}
  // } else {
  //   where = {
  //     id: {
  //       [Op.lt] : req.body.id
  //     }
  //   }
  // }
  // console.log(req.body)
  const fullPost = await Post.findAll({
    include: [{
      model: Image
    }, {
      model: Category
    }],
    order: [['id', 'DESC']]
  });
  // console.log(fullPost)
  res.status(201).json(fullPost);
});

router.put('/:id', isLoggedIn, async (req, res, next) => {// 글수정 - 2021 10 18 ITWoo
  console.log(req.body.content)
  const data = req.body.content;
  const index = data.lastIndexOf("<img"); // 나중에들어온 이미지 추출
  const start = data.indexOf('src="', index + 1);
  const end = data.indexOf('"', start + 6);
  var list = data.substring(start + 5, end);
  console.log(list)
  const [category, created] = await Category.findOrCreate({
    where: { kinds: req.body.category },
  });

  const post = await Post.update({ content: req.body.content, CategoryId: category.id }, {
    where: {
      id: req.params.id
    }
  });
  if (index !== -1) {
    await Image.destroy({
    where: { src: 'https://via.placeholder.com/250x150/00CED1/000000', PostId: req.params.id }
  });
    await Image.findOrCreate({ where: {src: list, PostId: req.params.id} });
  }
  const fullPost = await Post.findAll({ // 수정후 응답
    include: [{
      model: Image
    }, {
      model: Category
    }, {
      model: User,
      attributes: {
        exclude: ['password']
      }
    }],
    order: [['id', 'DESC']]
  });
  res.status(201).json(fullPost);
});

router.delete('/:id', isLoggedIn, async (req, res, next) => { // 글 삭제 - 2021 10 18 ITwoo
  await Post.destroy({
    where: {
      id: req.params.id
    }
  });

  const fullPost = await Post.findAll({
    include: [{
      model: Image
    }, {
      model: Category
    }, {
      model: User,
      attributes: {
        exclude: ['password']
      }
    }],
    order: [['id', 'DESC']]
  });
  res.status(201).json(fullPost);
});

router.post('/images', upload.single('upload'), (req, res, next) => { // 이미지 다운로드 - 2021 10 18 ITwoo
  const url = 'http://localhost:8080/' + req.file.filename;
  res.send({ url: url })
});

module.exports = router;