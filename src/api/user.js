/**
 * user模块接口列表
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
  personInfo() {
    return axios.post(
      `/jm-user-service/JmAppUserCenter/findOne`,
      {},
      {
        params: {
          id: store.state.user.userId
        }
      }
    )
  }
}
export default user
