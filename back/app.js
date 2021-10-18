const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
// const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');

const postRouter = require('./routes/post')
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();


db.sequelize.sync()
.then(() => {
  console.log('db 연결 성공');
})
.catch(console.error);

passportConfig();

// app.use(morgan('dev'));
app.use(cors({ // corss origin resorce sharing
  origin: 'http://localhost:3000',
  credentials: true,
}
));

app.use('/', express.static(path.join(__dirname, 'uploads')));
// app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(session({
//   saveUninitialized: false,
//   resave: false,
//   secret: process.env.COOKIE_SECRET,
//   cookie: { 
//     secure: false,
//     maxAge: 1000 * 60 * 10,
//   }
// }));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  proxy: true,
  cookie: { 
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 10,
    sameSite: "none",
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', (req, res, next) => {
  res.send('hello express');
});

// // app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter)
app.use('/user', userRouter)

app.listen(8080, () => {
  console.log('서버 실행 중!');
});
