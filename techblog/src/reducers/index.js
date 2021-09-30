import { combineReducers } from 'redux';

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import post from './post'
import user from './user'
// import user from './user';
// import post from './post';

// (이전상태, 액션) => 다음상태
// const rootReducer = combineReducers({
//   index: (state = {}, action) => {
//     switch (action.type) {
//       case HYDRATE:
//         console.log('HYDRATE', action);
//         return { ...state, ...action.payload };
//       default:
//         return state;
//     }
//   },
//   user,
//   post,
// });

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  // whitelist: ["auth"]
  // blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({
  post,
  user,
});


// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
