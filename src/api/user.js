/**
 * log模块接口列表
 * @author lyh
 * @date 2020-10-12
 */

import axios from '@/utils/request'
import store from '@/store'
const user = {
  // 登录-获取验证码
  getMobileCode(data) {
    return axios.post(
      `/jm-user-service/IdentifyCode/getMobileIndentifyCode`,
      {},
      {
        params: {
          mobile: data
        }
      }
    )
  },
  // 登录
  login(data) {
    return axios.post(`/jm-user-service/JmAppUser/login`, data)
  },
  // 获取个人信息
  personInfo(id) {
    return axios.post(
      `/jm-user-service/JmAppUserCenter/findOne`,
      {},
      {
        params: {
          id
        }
      }
    )
  },
  // 更新头像
  updateHead(data) {
    return axios.post(`/jm-user-service/JmAppUserCenter/updateHead`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 更新昵称
  updateNickName(data) {
    return axios.post(`/jm-user-service/JmAppUserCenter/updateNickName`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 更新签名
  updateSign(data) {
    return axios.post(`/jm-user-service/JmAppUserCenter/updateSign`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 更换手机号
  updateMobile(data) {
    return axios.post(`/jm-user-service/JmAppUserCenter/updateMobile`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 登录-获取验证码
  getMobileIndentifyCode(data) {
    return axios.post(
      `/jm-user-service/IdentifyCode/getMobileIndentifyCode`,
      {},
      {
        params: {
          mobile: data
        }
      }
    )
  }

}
export default user
