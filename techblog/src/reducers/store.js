import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from 'redux-logger';
import { persistStore } from "redux-persist";

import rootSaga from "../sagas";
import rootReducer from "./";


const sagaMiddleware = createSagaMiddleware();
const enhancer =
process.env.NODE_ENV === "production"
? compose(applyMiddleware(sagaMiddleware))
: composeWithDevTools(applyMiddleware(sagaMiddleware, logger));
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga); // 루트 사가를 실행해줍니다.
// const persistor = persistStore(store);

// const stores = {
//   store,
//   persistor
// }
export default store;