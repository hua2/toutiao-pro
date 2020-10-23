<template>
  <div class="comment">
    <div class="comment-list">
      <a-spin :spinning="loading">
        <div class="w-full" style="min-height: 600px">
          <div
            v-for="(co, index) in data"
            :key="index"
            class="c-l-left"
            :class="replayShowId === co.id?'click':''"
          >
            <div class="c-l-top flex items-center">
              <img
                :src="co.headPicUrl"
                alt=""
              />
              <strong><a href="#">{{ co.nickName }}</a></strong>
              <span>评论了 {{ co.mediaBean.type===0?'文章':co.mediaBean.type===1?'视频':'问答' }}</span>
              <span class="truncate"><a href="#"> {{ co.mediaBean.title }} </a></span>
            </div>
            <div class="c-l-content flex flex-col mt-8">
              <p>
                <span v-if="co.stick === 1" class="c-l-c-top mr-6 text-center">
                  置顶
                </span>
                {{ co.content }}
              </p>
              <div class="c-l-reply mt-12 flex items-center justify-between">
                <div> {{ formatTime(co.mediaBean.releaseDate) }}</div>
                <div class="flex">
                  <p @click="replyClick(co)" >回复 <span v-if="co.commentNum">{{co.commentNum}}</span></p>
                  <p> <span
                        v-if="co.isPraise === 0"
                        @click="praiseCommentMedia(co.id, 1)"
                      ><a-icon type="star" />点赞</span>
                    <span v-else @click="praiseCommentMedia(co.id, 0)"><a-icon type="star" />{{ co.praiseNum }}</span>
                  </p>
                  <p>
                    <a-popconfirm
                      title="确定置顶此内容？"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="mediaCommentStick(co.stick === 1?0:1,co.id,co.aid)"
                    >
                      <a v-if="co.stick === 0" href="#">
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
                          <a href="javascript:;">
                            <a-popconfirm
                              title="确定执行此操作？"
                              ok-text="确定"
                              cancel-text="取消"
                              @confirm="deleteCommentMedia(co.id)"
                            >
                              删除
                            </a-popconfirm>
                          </a>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="showLoadingMore && data.length !== 0"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
        >
          <a-spin v-if="loadingMore" />
          <a-button v-else @click="onLoadMore">
            loading more
          </a-button>
        </div>
        <div v-else class="mt-64">
          <a-empty />
        </div>
      </a-spin></div>
    <CommentReplyList ref="replyList" @change="loadData" />
  </div>
</template>

<script>
import store from '@/store'
import { formatTime } from '@/utils/time'
import CommentReplyList from '@/views/manage/comment/components/CommentReplyList'

export default {
  name: 'CommentList',
  components: { CommentReplyList },
  data() {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      pageSize: 10,
      pageNumber: 1,
      keywords: '',
      replayShowId: null
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    mediaCommentStick(num, value, aid) {
      this.$api.work.mediaCommentStick({
        id: value,
        aid: aid,
        isStick: num
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loadData()
        }
      })
    },
    deleteCommentMedia(id) {
      this.$api.work.deleteCommentMedia({
        id: id
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loadData()
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
            this.loadData()
          }
        })
    },
    formatTime,
    loadData() {
      this.loading = true
      this.$api.work.findCommentPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: store.state.user.userId
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loading = false
          this.data = res.data.data
          if (this.data && this.data.length > 0) {
            this.replyClick(this.data[0])
          }
        }
      })
    },
    onLoadMore() {
      this.loadingMore = true
      this.pageNumber++
      this.$api.work.findCommentPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: store.state.user.userId
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.data = this.data.concat(res.data.data)
          this.loadingMore = false
        }
      })
    },
    replyClick(data) {
      this.replayShowId = data.id
      this.$refs.replyList.replyData = data
      this.$refs.replyList.loadReplyData()
    }
  }
}
</script>

<style scoped lang="less">
.comment{
  width: 100%;
  display: flex;
  /*padding: 0 32px;*/zh
  .comment-list {
    width: 50%;
    .c-l-left{
      width: 100%;
      cursor: pointer;
      padding: 20px;
      border-bottom: 1px solid #e2e8f0;
      &.click{
        border-left: 1px solid red;
      }
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
}
</style>
