import request from '@/plugins/request'

const account = {}

/**
 * @constructor 登录
 * @param {Object} param data
 * @param {Object} param username {String} 用户账号
 * @param {Object} param password {String} 密码
 * @type 'post'
 */
account.AccountLogin = (data) => {
  return request({
    url: '/mds/sys/login',
    method: 'post',
    data
  })
}

/**
 * @constructor 登出
 * @param {Object} param {}
 * @type 'post'
 */
account.AccountLogout = (data) => {
  return request({
    url: '/mds/sys/logout',
    method: 'post',
    data
  })
}
export default account
