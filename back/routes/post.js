const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');

const { Post, Image, Category, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.')
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
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

router.get('/', (req, res, next) => {
  console.log('hello test1');
  console.log(req.body.data);
});

router.post('/write', isLoggedIn, async (req, res, next) => { //write
  const data = req.body.content;
  const ctgr = req.body.category;
  console.log(req.body);
  const index = data.indexOf("<img");
  const start = data.indexOf('"', index + 1);
  const end = data.indexOf('"', start + 1);
  // console.log(start, end)
  var list = data.substring(start + 1, end);
  // console.log(list)
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
  const fullPost = await Post.findAll({
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

router.post('/content', async (req, res, next) => { //read one
  console.log(req.body)
  const post = await Post.findOne({
    where: { id: req.body.id },
    include: [{
      model: Image
    }, {
      model: Category
    }]
  });
  // console.log(fullPost)
  res.status(201).json(post);
});

router.post('/contents', async (req, res, next) => { //read many
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

router.post('/update', isLoggedIn, async (req, res, next) => {
  console.log(req.body)
  const [category, created] = await Category.findOrCreate({
    where: { kinds: req.body.category },
  });

  const post = await Post.update({ content: req.body.content, CategoryId: category.id }, {
    where: {
      id: req.body.id
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

router.post('/delete', isLoggedIn, async (req, res, next) => {
  await Post.destroy({
    where: {
      id: req.body.id
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
    }]
  });
  res.status(201).json(fullPost);
});

router.post('/images', upload.single('upload'), (req, res, next) => {
  const url = 'http://localhost:8080/' + req.file.filename;
  res.send({ url: url })
});

module.exports = router;