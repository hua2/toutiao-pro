<template>
  <div class="works-modal mt-24">
    <div class="works-tab">
      <a-form>
        <div class="w-t-left flex">
          <a-form-item label="形式">
            <a-select v-model="wenda" @change="searchData">
              <a-select-option :value="1">回答</a-select-option>
              <a-select-option :value="0">提问</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="w-t-right">
          <a-form-item>
            <a-range-picker v-model="releaseDate" format="YYYY-MM-DD" class="mr-24" @change="handleDate" />
          </a-form-item>
          <a-button type="primary" icon="search" @click="searchData">查询</a-button>
          <a-button type="primary" icon="reload" @click="searchReset">重置</a-button>
        </div>
      </a-form>
    </div>
    <a-spin :spinning="loading">
      <div class="w-full" style="min-height: 600px">
        <div
          v-for="(ask, index) in data"
          :key="index"
          class="w-m-content flex"
        >
          <div class="w-full">
            <div class="flex justify-between items-center">
              <h3>
                <a href="#">{{ ask.title }}</a>
              </h3>
              <p>{{ formatTime(ask.releaseDate) }}</p>
            </div>
            <div class="truncate-2">
              <p v-html="ask.contentShorter"></p>
            </div>
            <div class="mt-16 flex items-center">
              <div class="w-m-num">
                <span>阅读 {{ ask.clickNum }}</span>
                <span>点赞 {{ ask.praiseNum }}</span>
                <span>评论 {{ ask.commentNum }}</span>
              </div>
              <div style="flex:1 0 auto">
                <span v-if="wenda === 1">查看数据</span>
                <span v-if="wenda === 1" @click="editListClick(ask.id)">编辑</span>
                <span v-if="wenda === 0">
                  <a-button
                    type="link"
                    style="color: #f56565"
                    @click="writeListClick(ask.id, 1)"
                  >
                    <a-icon type="edit" />
                    写回答
                  </a-button>
                </span>
                <span v-if="wenda === 0" @click="updateClick(ask.id)">修改</span>
                <span>
                  <a-dropdown>
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                      更多
                    </a>
                    <a-menu slot="overlay" @click="onClick">
                      <a-menu-item key="1">
                        <a href="javascript:;">分享</a>
                      </a-menu-item>
                      <a-menu-item key="2">
                        <a href="javascript:;">
                          <a-popconfirm
                            title="确定执行此操作？"
                            ok-text="确定"
                            cancel-text="取消"
                            @confirm="deleteMedia(ask.id)"
                          >
                            删除
                          </a-popconfirm>
                        </a>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                </span>
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
    </a-spin>
    <UpdateModal ref="updateModal" @updateModal="loadData" />
  </div>
</template>

<script>
import store from '@/store'
import { formatTime } from '@/utils/time'
import UpdateModal from '@/views/manage/works/modules/UpdateModal'

export default {
  name: 'AskList',
  components: { UpdateModal },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      releaseDate: [],
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      pageSize: 10,
      pageNumber: 1,
      keywords: '',
      releaseDateGte: '',
      releaseDateLte: '',
      wenda: 1
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    updateClick(id) {
      this.$refs.updateModal.showUpdateModal()
      this.$refs.updateModal.id = id
      this.$refs.updateModal.findOne()
    },
    deleteMedia(id) {
      this.$api.work.deleteDraftBox({
        id: id
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loadData()
        }
      })
    },
    editListClick(id) {
      if (id) {
        this.$router.push({
          name: 'publishPublishQuestion',
          query: { id: id }
        })
      }
    },
    writeListClick(id, wenda) {
      if (id || wenda) {
        this.$router.push({
          name: 'publishPublishQuestion',
          query: { id: id, wenda: wenda }
        })
      }
    },
    searchReset() {
      this.releaseDate = []
      this.releaseDateGte = ''
      this.releaseDateLte = ''
      this.searchData()
    },
    handleDate(e, date) {
      this.releaseDateGte = date[0]
      this.releaseDateLte = date[1]
    },
    formatTime,
    searchData() {
      this.pageNumber = 1
      this.loadData()
    },
    loadData() {
      this.loading = true
      this.$api.work.findPersonalPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: store.state.user.userId,
        keywords: this.keywords,
        type: this.type,
        wenda: this.wenda,
        releaseDateGte: this.releaseDateGte,
        releaseDateLte: this.releaseDateLte
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
      this.$api.work.findPersonalPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: store.state.user.userId,
        keywords: this.keywords,
        type: this.type,
        releaseDateGte: this.releaseDateGte,
        releaseDateLte: this.releaseDateLte
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.data = this.data.concat(res.data.data)
          this.loadingMore = false
        }
      })
    },
    onClick({ key }) {
      console.log(`Click on item ${key}`)
    }
  }
}
</script>

<style scoped lang="less">
.works-modal {
  width: 100%;
  .works-tab{
    /deep/ .ant-form{
      display: flex;
      .w-t-left{
        .ant-form-item-label{
          width: 48px;
          text-align: left;
          margin-left: 10px;
        }
        .ant-form-item{
          display: flex;
          align-items: center;
        }
        .ant-form-item-control{
          min-width: 60px;
        }
        .ant-select{
          max-width: 135px;
        }
      }
      .w-t-right{
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;
        .ant-col{
          max-width: 240px;
          margin-left: 24px;
        }
        button{
          margin-left: 16px;
          margin-top: 4px;
        }
      }
    }
  }
  .w-m-content {
    padding: 24px 0;
    border-bottom: 1px solid #e8e8e8;
    video{
      width: 168px;
      min-width: 168px;
      height: 108px;
      margin-right: 24px;
      object-fit:cover;
      border-radius: 2px;
    }
    span{
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
      margin-left: 12px;
      color: rgba(0, 0, 0, 0.85);
      transition: all 0.3s ease-in-out;
      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }
    }
    .w-m-num{
      span {
        &:first-child{
          margin-left: unset;
        }
      }
    }
    a {
      img {
        width: 168px;
        min-width: 168px;
        height: 108px;
        margin-right: 24px;
        position: relative;
        overflow: hidden;
        border-radius: 4px;
        object-fit:contain;
        transition: all 0.5s ease-out 0.1s;
        &:hover {
          transform: matrix(1.04, 0, 0, 1.04, 0, 0);
          overflow: hidden;
        }
      }
    }
    h3 {
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 600;
      color: #222;
      margin-bottom: 12px;
      span{
        width: 38px;
        color: #fff;
        font-size: 14px;
        border-radius: 2px;
        background-color: #ff5e5e;
      }
    }
  }
}
</style>
