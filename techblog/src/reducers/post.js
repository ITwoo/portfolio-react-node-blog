// reducers/userTicket.js
import produce from "immer";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS
} from "../actionTypes/post";

const initalState = {
  id: 0,
  post: { content: '<div>NOT FOUND</div>' },
  posts: [{ content: '<div>NOT FOUND</div>' }],
  loading: false
};

const post = (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.loading = true;
        break;
      case ADD_POST_SUCCESS:
        draft.posts = action.data;
        draft.loading = false;
        break;
      case ADD_POST_FAILURE:
        draft.error = action.data;
        draft.loading = false;
        break;
      case LOAD_POST_REQUEST:
        draft.loading = true;
        break;
      case LOAD_POST_SUCCESS:
        draft.post = action.data;
        draft.loading = false;
        break;
      case LOAD_POST_FAILURE:
        draft.loading = false;
        break;
      case LOAD_POSTS_REQUEST:
        draft.loading = true;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.posts = action.data;
        draft.loading = false;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loading = false;
        break;
      case REMOVE_POST_REQUEST:
        draft.loading = true;
        break;
      case REMOVE_POST_SUCCESS:
        draft.posts = action.data;
        draft.loading = false;
        break;
      case REMOVE_POST_FAILURE:
        draft.loading = false;
        break;
      case UPDATE_POST_REQUEST:
        draft.loading = true;
        break;
      case UPDATE_POST_SUCCESS:
        draft.posts = action.data;
        draft.loading = false;
        break;
      case UPDATE_POST_FAILURE:
        draft.loading = false;
        break;
      default:
        return state;
    }
  });

export default post;