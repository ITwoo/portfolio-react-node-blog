import { all, fork } from "redux-saga/effects";
import axios from "axios";

import post from "./post";
import user from './user'

// axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.baseURL = 'https://backserver-techblog.herokuapp.com/'
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(post),
    user(post)
  ]);
}