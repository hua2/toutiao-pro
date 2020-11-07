<template>
  <div class="ask-comment flex">
    <div class="a-s-list">
      <a-spin :spinning="loading">
        <div style="min-height: 600px">
          <div
            v-for="(c, index) in data"
            :key="index"
            @click="viewCommentClick(c)"
          >
            <div class="a-s-common">
              <h3 class="truncate">{{ c.title }}</h3>
              <p class="truncate-2">{{ c.contentShorter }}</p>
              <div class="flex justify-between">
                <span>{{ formatTime(c.createDate) }}</span>
                <span>回复 <span v-if="c.commentNum">{{ c.commentNum }}</span></span>
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
        </div>
      </a-spin>
    </div>
    <div class="a-s-reply pl-32">
      <GraphicReplyList ref="graphicReplyList" />
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { formatTime } from '@/utils/time'
import GraphicReplyList from '@/views/manage/comment/components/GraphicReplyList'

export default {
  name: 'AskCommentList',
  components: { GraphicReplyList },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      pageSize: 10,
      pageNumber: 1
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    formatTime,
    loadData() {
      this.loading = true
      this.$api.work.findPersonalMediaPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: store.state.user.userId,
        visitUserId: store.state.user.userId,
        type: this.type
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loading = false
          this.data = res.data ? res.data.data : []
          if (this.data && this.data.length > 0) {
            this.viewCommentClick(this.data[0])
          }
        }
      })
    },
    onLoadMore() {
      this.loadingMore = true
      this.pageNumber++
      this.$api.work.findPersonalMediaPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: store.state.user.userId,
        visitUserId: store.state.user.userId,
        type: this.type
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.data = this.data.concat(res.data ? res.data.data : [])
          this.loadingMore = false
        }
      })
    },
    viewCommentClick(data) {
      this.$refs.graphicReplyList.graphicReplyData = data
      this.$refs.graphicReplyList.loadViewData()
    }
  }
}
</script>

<style scoped lang="less">
.ask-comment{
  width: 100%;
  .a-s-list{
    width: 50%;
    padding: 0 20px;
    overflow: hidden;
    border-right: 1px solid #e2e8f0;
    .a-s-common{
      width: 100%;
      padding: 12px 32px 12px 0;
      border-bottom: 1px solid #e2e8f0;
      h3{
        font-size: 14px;
        color: #666;
      }
      p{
        margin-top: 8px;
        font-size: 16px;
        color: #222;
      }
    }
  }
  .a-s-reply{
      width: 50%;
  }
}
</style>
