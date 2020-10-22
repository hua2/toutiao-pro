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
  },
  // 发布媒体
  publishMedia(data) {
    return axios.post(
      `/jm-information-service/JmMedia/publish`, data
    )
  },
  // 编辑媒体
  updateMedia(data) {
    return axios.post(
      `/jm-information-service/JmMedia/update`, data
    )
  },
  // 发布草稿箱
  publishDraft(data) {
    return axios.post(
      `/jm-information-service/JmMedia/publishDraft`, data
    )
  },
  // 上传图片 fileType为4
  uploadPicture(file, type) {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('fileType', type)
    return axios.post(`/jm-rfq-service/common/upload-picture`, fd)
  },
  // 作品管理-删除草稿箱
  deleteDraftBox(data) {
    return axios.post(
      `/jm-information-service/JmMedia/delete`, data
    )
  },
  // 评论列表
  findPage(data) {
    return axios.post(
      `/jm-comment-service/JmMediaComment/findPage`, data
    )
  },
  // 评论管理-全部
  findCommentPage(data) {
    return axios.post(
      `/jm-comment-service/JmMediaComment/findPersonalPage`, data
    )
  },
  // 问答列表
  findQuestionPage(data) {
    return axios.post(
      `/jm-information-service/JmMedia/findQuestionShowPage`, data
    )
  },
  // 问答收藏
  collectMedia(data) {
    return axios.post(
      `/jm-information-service/JmMedia/collect`, data
    )
  },
  // 评论管理-点赞
  praiseCommentMedia(data) {
    return axios.post(
      `/jm-comment-service/JmMediaComment/praise`, data
    )
  },
  // 评论管理-置顶
  mediaCommentStick(data) {
    return axios.post(
      `/jm-comment-service/JmMediaComment/stick`, data
    )
  },
  // 评论管理-删除
  deleteCommentMedia(data) {
    return axios.post(
      `/jm-comment-service/JmMediaComment/delete`, data
    )
  },
  // 评论管理-发布回复
  publishComment(data) {
    return axios.post(
      `/jm-comment-service/JmMediaComment/publishComment`, data
    )
  },
  // 问答收藏列表
  findCollectPage(data) {
    return axios.post(
      `/jm-information-service/JmMedia/findCollectPage`, data
    )
  },
  // 问答回答列表
  findAnswerPage(data) {
    return axios.post(
      `/jm-information-service/JmMedia/findAnswerPage`, data
    )
  }
}

export default work
