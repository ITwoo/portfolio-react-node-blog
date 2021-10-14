import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, JOIN_REQUEST, JOIN_SUCCESS, JOIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE } from '../actionTypes/user';

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

function logOutUserApi() {
  return axios.delete("/auth/logout");
}


function* logOutUser() {
  try {
    // api 통신할때는 call
    const result = yield call(logOutUserApi);
    console.log(result)
    // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
    yield put({
      type: LOGOUT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: LOGOUT_FAILURE,
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

function loadUserApi() {
  return axios.get("/user");
}

function* loadUser(action) {
  try {
    // api 통신할때는 call
    const result = yield call(loadUserApi);
    console.log(result)
    // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data
    });
  } catch (err) {
    // console.error(err)
    yield put({
      type: LOAD_USER_FAILURE,
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

function* watchLogOut() {
  yield takeLatest(LOGOUT_REQUEST, logOutUser);
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* userTicketSaga() {
  yield all([fork(watchLogIn)]);
  yield all([fork(watchJoin)]);
  yield all([fork(watchLogOut)]);
  yield all([fork(watchLoadUser)]);

}