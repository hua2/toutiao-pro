<template>
  <div v-if="show" class="second-list">
    <a-spin :spinning="loading">
      <div class="w-full" style="min-height: 300px">
        <div
          v-for="(se, index) in data"
          :key="index"
          class="mt-24"
        >
          <img :src="se.headPicUrl" alt="">
          <strong><a href="#">{{ se.nickName }}</a></strong>
          回复
          <strong><a href="#">{{ se.toNickName }}</a></strong>
          <p class="truncate">{{ se.content }}</p>
          <div class="flex justify-between s-l-time">
            <div>{{ formatTime(se.updateDate) }}</div>
            <div v-if="userId === se.uid">
              <a href="javascript:;">
                <a-popconfirm
                  title="确定执行此操作？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="deleteCommentMedia(se.id)"
                >
                  删除
                </a-popconfirm>
              </a></div>
            <div v-else class="flex">
              <p @click="replyClick(se)">{{ se.showReply?'取消回复':'回复' }} <span v-if="se.commentNum">{{ se.commentNum }}</span></p>
            </div>
          </div>
          <div v-if="se.showReply" class="mt-16 mb-12">
            <a-textarea
              v-model="replyContent"
              placeholder="积极回复可吸引更多人评论"
              :rows="4"
            />
            <div class="flex justify-end mt-12">
              <a-button type="primary" :disabled="replyContent===''" @click="publishReplyComment(replyData.type,replyData.aid,se.id,replyData.id,se.uid)">发布</a-button>
            </div>
          </div>
        </div>
        <div
          v-if="showLoadingMore && data.length !== 0"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
        >
          <a-spin v-if="loadingMore" />
          <a-button v-else class="mt-24" @click="onLoad()">
            loading more
          </a-button>
        </div>
        <div v-else class="mt-64">
          <a-empty description="暂无评论" />
        </div>
      </div></a-spin>
  </div>
</template>

<script>
import { formatTime } from '@/utils/time'

export default {
  name: 'SecondReplyList',
  data() {
    return {
      show: false,
      replyData: {
        id: '',
        aid: '',
        uid: '',
        type: 0
      },
      loading: false,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      pageSize: 10,
      pageNumber: 1,
      replyContent: ''
    }
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    }
  },
  methods: {
    loadData() {
      this.loading = true
      this.data = []
      this.$api.work.findPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        replyPid: this.replyData.id,
        aid: this.replyData.aid,
        type: this.replyData.type
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loading = false
          this.data = res.data ? res.data.data : []
        }
      })
    },
    onLoad() {
      this.loadingMore = true
      this.pageNumber++
      this.$api.work.findPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        replyPid: this.replyData.id,
        aid: this.replyData.id,
        type: this.replyData.type
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.data = this.data.concat(res.data ? res.data.data : [])
          this.loadingMore = false
        }
      })
    },
    formatTime,
    deleteCommentMedia(id) {
      this.$api.work.deleteCommentMedia({
        id: id
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loadData()
          this.$emit('changeList')
        }
      })
    },
    replyClick(data) {
      data.showReply = !data.showReply
      if (data.showReply) {
        this.data = this.data.map(d => {
          d.showReply = false
          return d
        })
        this.replyContent = ''
        data.showReply = true
      }
      this.$forceUpdate()
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
          this.loadData()
          this.$emit('changeList')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.second-list{
  margin-left: 50px;
  padding: 12px 0;
  img{
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  strong{
    margin: 0 8px;
    white-space: nowrap;
  }
  p{
    font-size: 15px;
    margin-top: 12px;
  }
  .s-l-time{
    font-size: 14px;
    cursor: pointer;
    color: var(--black03);
  }
}
</style>
