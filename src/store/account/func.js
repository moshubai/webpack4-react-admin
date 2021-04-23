import { LOGIN_SAGA } from './Symbol'

export const login = (userInfo) => {
  console.log('userInfo', userInfo) // xu-log
  return { type: LOGIN_SAGA, payload: userInfo }
}
