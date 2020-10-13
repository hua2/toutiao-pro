/**
 * user模块接口列表
 * @author lyh
 * @date 2020-10-12
 */

import axios from '@/utils/request'

const work = {
  // 作品管理
  findPersonalPage(data) {
    return axios.post(
      `/jm-information-service/JmMedia/findPersonalPage`, data
    )
  },
  // 作品管理-详情
  findOne(data) {
    return axios.post(
      `/jm-information-service/JmMedia/findOne`, data
    )
  },
  // 仅我可见
  onlyMe(data) {
    return axios.post(
      `/jm-information-service/JmMedia/only`, data
    )
  },
  // 置顶
  stickWork(data) {
    return axios.post(
      `/jm-information-service/JmMedia/stick`, data
    )
  }
}

export default work
