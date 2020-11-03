<template>
  <div class="comment-list ml-24 relative">
    <div class="c-l-left">
      <div class="c-l-top flex items-center">
        <img
          :src="replyData.headPicUrl"
          alt=""
        />
        <strong><a href="#">{{ replyData.nickName }}</a></strong>
        <span>评论了{{ replyData.mediaBean.type===0?'文章':replyData.mediaBean.type===1?'视频':'问答' }}</span>
        <span class="truncate"><a href="#">{{ replyData.mediaBean.title }} </a></span>
      </div>
      <div class="c-l-content flex items-center mt-8">
        <p>
          <span v-if="replyData.stick === 1" class="c-l-c-top mr-6 text-center">
            置顶
          </span>
          {{ replyData.content }}
        </p>
      </div>
      <div class="c-l-reply mt-12 flex items-center justify-between">
        <div>{{ formatTime(replyData.mediaBean.releaseDate) }}</div>
        <div class="flex">
          <p @click="replyClick">{{ show?'取消回复':'回复' }}</p>
          <p> <span
                v-if="replyData.isPraise === 0"
                @click="praiseCommentMedia(replyData.id, 1)"
              ><a-icon type="star" />点赞</span>
            <span v-else @click="praiseCommentMedia(replyData.id, 0)"><a-icon type="star" />{{ replyData.praiseNum }}</span>
          </p>
          <p>
            <a-popconfirm
              title="确定置顶此内容？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="mediaCommentStick(replyData.stick === 1?0:1,replyData.id,replyData.aid)"
            >
              <a v-if="replyData.stick === 0" href="#">
                置顶
              </a>
              <a v-else href="#">
                取消置顶
              </a>
            </a-popconfirm>
          </p>
          <p>
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                ...
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a href="javascript:;">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </p>
        </div>
      </div>
      <div class="mt-16 mb-12">
        <a-textarea
          v-if="show"
          v-model="content"
          placeholder="积极回复可吸引更多人评论"
          :rows="4"
        />
        <div class="flex justify-end mt-12">
          <a-button type="primary" @click="publishComment(replyData.type,replyData.aid,replyData.id,replyData.uid)">发布</a-button>
        </div>
      </div>
      <a-spin :spinning="loading">
        <div class="w-full" style="min-height: 300px">
          <div
            v-for="(re, index) in data"
            :key="index"
            class="c-l-left"
          >
            <div class="mt-24">
              <div class="c-l-top flex items-center">
                <img
                  :src="re.headPicUrl"
                  alt=""
                />
                <strong><a href="#">{{ re.nickName }}</a></strong>
                <span><a href="#"> {{ re.toNickName }}</a> </span>
              </div>
              <div class="c-l-content mt-8">
                <p>
                  {{ re.content }}
                </p>
              </div>
              <div class="c-l-reply mt-12 flex items-center justify-between">
                <div>{{ formatTime(re.updateDate) }}</div>
                <div v-if="userId = re.uid">
                  <a href="javascript:;">
                    <a-popconfirm
                      title="确定执行此操作？"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="deleteCommentMedia(re.id)"
                    >
                      删除
                    </a-popconfirm>
                  </a></div>
                <div v-else>
                  <p @click="replyShowClick">{{ showReply?'取消回复':'回复' }}</p>
                </div>
              </div>
              <div v-if="showReply" class="mt-16 mb-12">
                <a-textarea
                  v-model="replyContent"
                  placeholder="积极回复可吸引更多人评论"
                  :rows="4"
                />
                <div class="flex justify-end mt-12">
                  <a-button type="primary"  :disabled="replyContent===''"  @click="publishReplyComment(replyData.type,replyData.aid,re.id,replyData.id,re.uid)">发布</a-button>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="showLoadingMore && data.length !== 0"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
          >
            <a-spin v-if="loadingMore" />
            <a-button v-else @click="onLoadMore()">
              loading more
            </a-button>
          </div>
          <div v-else class="mt-64">
            <a-empty description="暂无回复" />
          </div>
        </div>
      </a-spin>
    </div>
  </div></template>

<script>

import { formatTime } from '@/utils/time'
import store from '@/store'
export default {
  name: 'CommentReplyList',
  data() {
    return {
      replyData: {
        id: '',
        aid: '',
        nickName: '',
        headPicUrl: '',
        content: '',
        isPraise: 0,
        stick: 0,
        mediaBean: {
          title: '',
          type: 0,
          releaseDate: ''
        }
      },
      show: true,
      showReply: false,
      showDelete: true,
      content: '',
      replyContent: '', // 评论列表回复

      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      pageSize: 10,
      pageNumber: 1
    }
  },
  userId() {
    return this.$store.state.user.userId
  },
  methods: {
    deleteCommentMedia(id) {
      this.$api.work.deleteCommentMedia({
        id: id
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loadReplyData()
        }
      })
    },
    loadReplyData() {
      this.loading = true
      this.$api.work.findPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        replyPid: this.replyData.id,
        aid: this.replyData.aid,
        type: this.replyData.mediaBean.type
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loading = false
          this.data = res.data ? res.data.data : []
        }
      })
    },
    onLoadMore() {
      this.loadingMore = true
      this.pageNumber++
      this.$api.work.findPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        replyPid: this.replyData.id,
        aid: this.replyData.aid,
        type: this.replyData.mediaBean.type
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.data = this.data.concat(res.data ? res.data.data : [])
          this.loadingMore = false
        }
      })
    },
    // 发布二级回复
    publishComment(type, aid, id, uid) {
      this.$api.work.publishComment({
        uid: this.$store.state.user.userId,
        aid: aid,
        type: type,
        replyId: id,
        replyPid: id,
        replyUid: uid,
        content: this.content
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.$message.success('发布成功')
          this.show = false
        }
      })
    },
    publishReplyComment(type, aid, id, pid, uid) {
      this.$api.work.publishComment({
        uid: this.$store.state.user.userId,
        aid: aid,
        type: type,
        replyId: id,
        replyPid: pid,
        replyUid: uid,
        content: this.replyContent
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.$message.success('发布成功')
          this.showReply = false
          this.loadReplyData()
        }
      })
    },
    replyClick() {
      this.show = !this.show
    },
    replyShowClick() {
      this.showReply = !this.showReply
    },
    formatTime,
    mediaCommentStick(num, value, aid) {
      this.$api.work.mediaCommentStick({
        id: value,
        aid: aid,
        isStick: num
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.$emit('change')
        }
      })
    },
    praiseCommentMedia(id, status) {
      this.$api.work
        .praiseCommentMedia({
          commentId: id,
          userId: store.state.user.userId,
          isPraise: status
        },
        this.token)
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.$message.success('操作成功')
            this.$emit('change')
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
  .comment-list {
    width: 50%;
    .c-l-left{
      width: 100%;
      cursor: pointer;
      padding-top: 20px;
      .c-l-top {
        img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
        strong,
        span {
          margin: 0 8px;
          white-space:nowrap;
        }
      }
      .c-l-content {
        .c-l-c-top {
          width: 38px;
          color: #fff;
          font-size: 14px;
          border-radius: 2px;
          background-color: #ff5e5e;
        }
        p {
          font-size: 15px;
          line-height: 24px;
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
        }
      }
      .c-l-reply {
        text-align: right;
        p {
          margin: 0 12px;
          cursor: pointer;
          white-space: nowrap;
          height: 20px;
          color: rgba(0, 0, 0, 0.85);
          transition: all 0.3s ease-in-out;
          &:hover {
            color: rgba(0, 0, 0, 0.65);
          }
        }
      }
    }

  }

</style>
