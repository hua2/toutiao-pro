import request from '@/utils/request'

const userApi = {
  Login: '/jm-user-service/IdentifyCode/getMobileIndentifyCode',
  // Logout: '/api/auth/logout',
  ForgePassword: '/api/auth/forge-password',
  Register: '/api/auth/register',
  SendSms: '/api/account/sms',
  SendSmsErr: '/api/account/sms_err',
  // get my info
  UserInfo: '/api/user/info',
  UserMenu: '/api/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha(parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function getInfo() {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav() {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
