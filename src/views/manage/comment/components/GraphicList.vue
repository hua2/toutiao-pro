<template>
  <div class="graphic flex">
    <div class="graphic-left">
      <a-input-search
        v-model="keywords"
        placeholder="搜索作品标题"
        style="max-width: 312px"
        @search="searchData"
      />
      <a-spin :spinning="loading">
        <div class="w-full" style="min-height: 600px">
          <div
            v-for="(gra, index) in data"
            :key="index"
            class="graphic-list flex"
            @click="viewCommentClick(gra)"
          >
            <a v-if="!gra.videoUrl" href="#">
              <img
                :src="gra.firstImg"
                alt=""
              /></a>
            <video
              v-else
              controls
              :src="gra.videoUrl"
              :poster="gra.videoUrl + '?x-oss-process=video/snapshot,t_0000,f_jpg'"
            />
            <div class="g-l-title ml-12">
              <a href="#">{{ gra.title }}</a>
              <div class="mt-4">评论 {{ gra.commentNum }}</div>
            </div>
          </div>
          <div
            v-if="showLoadingMore && data.length !== 0"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
          >
            <a-spin v-if="loadingMore" />
            <a-button v-else @click="onLoadMoreView">
              loading more
            </a-button>
          </div>
          <div v-else class="mt-64">
            <a-empty />
          </div>
        </div>
      </a-spin>
    </div>
    <div class="graphic-right pl-32">
      <GraphicReplyList ref="graphicReplyList" />
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { formatTime } from '@/utils/time'
import GraphicReplyList from '@/views/manage/comment/components/GraphicReplyList'

export default {
  name: 'GraphicList',
  components: { GraphicReplyList },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        region: ''
      },
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      pageSize: 10,
      pageNumber: 1,
      keywords: ''
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    searchData() {
      this.pageNumber = 1
      this.loadData()
    },
    loadData() {
      this.loading = true
      this.$api.work.findPersonalMediaPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: store.state.user.userId,
        visitUserId: store.state.user.userId,
        keywords: this.keywords,
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
    onLoadMoreView() {
      this.loadingMore = true
      this.pageNumber++
      this.$api.work.findPersonalMediaPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: store.state.user.userId,
        visitUserId: store.state.user.userId,
        keywords: this.keywords,
        type: this.type
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.data = this.data.concat(res.data ? res.data.data : [])
          this.loadingMore = false
        }
      })
    },
    formatTime,
    viewCommentClick(data) {
      this.$refs.graphicReplyList.graphicReplyData = data
      this.$refs.graphicReplyList.loadViewData()
    }
  }
}
</script>

<style scoped lang="less">
  .graphic {
    width: 100%;
    margin-top: 32px;
    .graphic-left {
      width: 50%;
      padding: 0 20px;
      overflow: hidden;
      border-right: 1px solid #e2e8f0;
      .graphic-list {
        width: 100%;
        padding: 12px 32px 12px 0;
        border-bottom: 1px solid #e2e8f0;
        &:first-child{
          margin-top: 8px;
        }
        video{
          width: 122px;
          min-width: 122px;
          height: 72px;
          object-fit:cover;
          border-radius: 2px;
        }
        img {
          width: 72px;
          height: 72px;
          border-radius: 2px;
        }
        .g-l-title {
          font-size: 14px;
          a {
            line-height: 24px;
            height: 48px;
            max-height: 78px;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            overflow: hidden;
            word-break: break-all;
          }
        }
      }
    }
    .graphic-right {
      width: 50%;
    }
  }

</style>
