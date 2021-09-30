// reducers/userTicket.js
import produce from "immer";
import { JOIN_FAILURE, JOIN_REQUEST, JOIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actionTypes/user";

const initalState = {
  info: null,
  loading: false,
  credential: false,
  loginLoading: null,
};

const user = (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.credential = false;
        draft.loginLoading = true;
        break;
      // 요기가 saga에 의해 실행된다.
      case LOGIN_SUCCESS:
        draft.info = action.data;
        draft.credential = true;
        draft.loginLoading = false;
        break;
      case LOGIN_FAILURE:
        draft.credential =false;
        draft.loginLoading = false;
        break;
      case JOIN_REQUEST:
        draft.loading = true;
        break;
      // 요기가 saga에 의해 실행된다.
      case JOIN_SUCCESS:
        draft.loading = false;
        break;
      case JOIN_FAILURE:
        draft.loading = false;
        break;
      default:
        return state;
    }
  });

export default user;