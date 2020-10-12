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
  }
}

export default work
