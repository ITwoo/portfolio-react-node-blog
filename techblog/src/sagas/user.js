import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, JOIN_REQUEST, JOIN_SUCCESS, JOIN_FAILURE } from '../actionTypes/user';

function logInUserApi(data) {
  return axios.post("/auth/login", data);
}


function* logInUser(action) {
  try {
    // api 통신할때는 call
    const result = yield call(logInUserApi, action.data);
    // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
    console.log(result)
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err)
    console.log('error')
    yield put({
      type: LOGIN_FAILURE,
      data: err.response.data
    });
  }
}

function JoinUserApi(data) {
  return axios.post("/auth/join", data);
}

function* JoinUser(action) {
  try {
    // api 통신할때는 call
    const result = yield call(JoinUserApi, action.data);
    // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
    yield put({
      type: JOIN_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: JOIN_FAILURE,
      data: err.response.data
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOGIN_REQUEST, logInUser);
}

function* watchJoin() {
  yield takeLatest(JOIN_REQUEST, JoinUser);
}

export default function* userTicketSaga() {
  yield all([fork(watchLogIn)]);
  yield all([fork(watchJoin)]);

}