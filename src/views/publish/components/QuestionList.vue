<template>
  <div class="question-modal">
    <div v-if="show" class="p-q-search">
      <a-input-search
        v-model="keywords"
        placeholder="搜索关键词"
        style="width: 200px"
        @search="searchData"
      />
      <a-button class="ml-24" @click="searchData">搜索</a-button>
    </div>
    <a-spin :spinning="loading">
      <div class="w-full" style="min-height: 600px">
        <div
          v-for="(a, index) in data"
          :key="index"
          class="q-m-list"
        >
          <div class="q-m-item">
            <h3>{{ a.title }}</h3>
            <div class="q-m-info flex justify-between">
              <div class="flex">
                <div class="mr-24">回答 {{ a.answerNum }}</div>
                <div>收藏 {{ a.collectNum }}</div>
              </div>
              <div class="flex cursor-pointer">
                <div class="text-red-500 mr-24" @click="askClick(a.id)">
                  <a-icon type="edit" />
                  写回答
                </div>
                <div
                  v-if="a.isCollect === 0"
                  @click="collectClick(a.id, 1)"
                ><a-icon type="star" />收藏</div>
                <div
                  v-else
                  @click="collectClick(a.id, 0)"
                ><a-icon type="star" />已收藏</div>
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
      </div>
    </a-spin></div></template>

<script>
import store from '@/store'

export default {
  name: 'QuestionList',
  props: {
    show: {
      type: Boolean,
      default: false
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
    askClick(id) {
      if (id) {
        this.$router.push({
          name: 'publishPublishQuestion',
          query: { id: id }
        })
      }
    },
    searchData() {
      this.pageNumber = 1
      this.loadData()
    },
    collectClick(id, status) {
      this.$api.work
        .collectMedia({
          id: id,
          userId: store.state.user.userId,
          isCollect: status
        },
        this.token)
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.$message.success('操作成功')
            this.loadData()
          }
        })
    },
    loadData() {
      this.loading = true
      this.$api.work.findQuestionPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: store.state.user.userId,
        keywords: this.keywords,
        pid: ''
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
      this.$api.work.findQuestionPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: store.state.user.userId,
        keywords: this.keywords
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
  .question-modal{
    width: 100%;
    .p-q-search{
      position: absolute;
      right: 0;
      top: 12px;
    }
.q-m-list{
  width: 100%;
  .q-m-item{
    padding: 24px 0;
    border-bottom:1px solid #e8e8e8 ;
    h3{
      font-size: 16px;
      font-weight: 700;
      line-height: 1.5;
      cursor: pointer;
      color: #222;
    }
    .q-m-info{
      margin-top: 16px;
      line-height: 28px;
      font-size: 14px;
    }
  }
}
  }

</style>
