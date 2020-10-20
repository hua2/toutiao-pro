<template>
  <a-spin :spinning="loading">
    <div class="w-full" style="min-height: 600px">
      <div
        v-for="(an, index) in data"
        :key="index"
        class="answer-list"
      >
        <div class="flex a-l-author">
          <img :src="an.authorLogo" alt="">
          <div>
            <strong class="truncate">{{ an.authorName }}</strong>
            <p class="truncate">{{ formatTime(an.releaseDate) }}</p>
          </div>
        </div>
        <ShowMore
          v-if="an.contentShorter || an.imgsList.length !=0"
          :show-height="128"
          :content="an.contentShorter"
        >
          <div
            v-for="(i, indexImg) in an.imgsList"
            :key="indexImg"
            class="a-l-img"
          >
            <img :src="i" alt="">
          </div>
        </ShowMore>
        <div class="mt-16">
          <span>点赞 {{ an.praiseNum }}</span>
          <span class="ml-8">评论 {{ an.commentNum }}</span>
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
</template>

<script>
import ShowMore from '@/components/ShowMore/index'
import store from '@/store'
import { formatTime } from '@/utils/time'
export default {
  name: 'AnswerPageList',
  components: { ShowMore },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
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
    formatTime,
    loadData() {
      this.loading = true
      this.$api.work.findAnswerPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: store.state.user.userId,
        keywords: this.keywords,
        pid: this.id
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loading = false
          this.data = res.data.data
        }
      })
    },
    onLoadMore() {
      this.loadingMore = true
      this.pageNumber++
      this.$api.work.findAnswerPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: store.state.user.userId,
        keywords: this.keywords,
        pid: this.id
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.data = this.data.concat(res.data.data)
          this.loadingMore = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.answer-list{
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid #e8e8e8;
  .a-l-img{
    img{
      max-width: 100%;
      height: 100%;
      display: block;
      margin: 10px auto;
    }
  }
  .a-l-author {
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      margin-right: 8px;
    }

    strong {
      font-size: 14px;
      font-weight: 500;
      color: var(--black01);
      cursor: pointer;
    }

    p {
      font-size: 12px;
      color: var(--black03);
    }
  }
}
</style>
