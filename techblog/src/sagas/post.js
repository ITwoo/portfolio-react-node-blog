import { all, fork, put, call, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POST_FAILURE,
  LOAD_POST_SUCCESS,
  LOAD_POST_REQUEST,
  REMOVE_POST_REQUEST,
  REMOVE_POST_FAILURE,
  REMOVE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS
} from "../actionTypes/post";

function addPostApi(data) {
  return axios.post("/post/write", data);
}

function* addPost(action) {
  try {
    // api 통신할때는 call
    const result = yield call(addPostApi, action.data);
    console.log(result)
    // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data
    });
  }
}

function updatePostApi(data) {
  return axios.put(`/post/${data.id}`, data);
}

function* updatePost(action) {
  try {
    // api 통신할때는 call
    const result = yield call(updatePostApi, action.data);
    // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: UPDATE_POST_FAILURE,
      data: err.response.data
    });
  }
}

function loadPostApi(data) {
  return axios.get(`/post/content/${data.id}`);
}

function* loadPost(action) {
  try {
    // api 통신할때는 call
    const result = yield call(loadPostApi, action.data);
    // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response.data
    });
  }
}

function loadPostsApi(data) {
  return axios.get("/post/contents",data);
}

function* loadPosts(action) {
  try {
    // api 통신할때는 call
    const result = yield call(loadPostsApi, action.data);
    // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data
    });
  }
}

function removePostApi(data) {
  return axios.delete(`/post/${data.id}`);
}

function* removePost(action) {
  try {
    // api 통신할때는 call
    const result = yield call(removePostApi, action.data);
    // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}


export default function* postSaga() {
  yield all ([
    fork(watchAddPost),
    fork(watchUpdatePost),
    fork(watchLoadPost),
    fork(watchLoadPosts),
    fork(watchRemovePost)
  ])
}