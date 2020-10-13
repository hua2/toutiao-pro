import storage from 'store'
import api from '@/api'
import { ACCESS_TOKEN, USER_ID } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    userId: '',
    info: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, userId) => {
      state.userId = userId
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api.user.login(userInfo)
          .then(response => {
            const result = response.data
            console.log(result.token)
            console.log(result.id)
            storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            storage.set(USER_ID, result.id, 7 * 24 * 60 * 60 * 1000)
            commit('SET_ID', result.id)
            commit('SET_NAME', { name: result.nickName || result.mobile, welcome: welcome() })
            commit('SET_AVATAR', result.headPicUrl)
            commit('SET_INFO', result)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      const id = state.userId || storage.get(USER_ID)
      return new Promise((resolve, reject) => {
        api.user.personInfo(id)
          .then(response => {
            const result = response.data
            commit('SET_NAME', { name: result.nickName || result.mobile, welcome: welcome() })
            commit('SET_AVATAR', result.headPicUrl)
            commit('SET_INFO', result)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        storage.remove(ACCESS_TOKEN)
        resolve()
      })
    }
  }
}

export default user
