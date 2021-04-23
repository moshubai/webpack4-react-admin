import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import loginSaga from './account/actions'
//
import counterReducer from './count/reducers'
import accountReducer from './account/reducers'

const sagaMiddleware = createSagaMiddleware()
// 数据仓库 get set subscribe（订阅）
const store = createStore(
  combineReducers({
    count: counterReducer,
    user: accountReducer
  }),
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(loginSaga)

export default store
