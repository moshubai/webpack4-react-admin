import { call, put, takeEvery } from 'redux-saga/effects'
import Api from 'Api'
import { LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS } from './Symbol'

/*
redux-saga/effects  明确几个api

fork：创建一个新的进程或者线程，并发发送请求。
call：发送 api 请求 阻塞型，调用异步操作 dispatch
put：发送对应的 dispatch，触发对应的 action,状态更新 dispatch
takeEvery：做saga监听,监听对应的 action；每一次 dispatch 都会触发；例如：点击一个新增的按钮，2s 后触发新增动作，在2s内不断点击按钮，这时候，每一次点击，都是有效的。
takeLatest：监听对应的 action；只会触发最后一次 dispatch；例如：点击一个新增的按钮，2s 后触发新增动作，在2s内不断点击按钮，这时候，只有最后一次点击是有效的。
all：跟 fork 一样，同时并发多个 action，没有顺序。
*/

const LoginService = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    Api.AccountLogin({ username, password })
      .then(res => {
        console.log('res', res) // xu-log
        resolve({
          username: '墨书白'
        })
      })
      .catch(err => {
        reject(err) // xu-log
      })
  })
}

function * loginHandle (action) {
  console.log('action', action) // xu-log

  try {
    // 阻塞型 call
    const res1 = yield call(LoginService, action.payload)
    console.log('res1', res1) // xu-log
    yield put({ type: LOGIN_SUCCESS, payload: { ...res1 } })
  } catch (err) {
    // yield put({ type: LOGIN_FAILURE, payload: err });
  }
}

// watcher saga
function * loginSaga () {
  yield takeEvery(LOGIN_SAGA, loginHandle)
}

export default loginSaga
