<template>
  <div class="works-modal mt-24">
    <div class="works-tab">
      <a-form>
        <div class="w-t-left flex">
          <a-form-item label="状态">
            <a-select v-model="state" @change="searchData">
              <a-select-option value="">全部</a-select-option>
              <a-select-option :value="0">草稿</a-select-option>
              <a-select-option :value="1">已发布</a-select-option>
              <a-select-option :value="2">待审核</a-select-option>
              <a-select-option :value="3">已拒绝</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="可见">
            <a-select v-model="only" @change="searchData">
              <a-select-option value="">全部</a-select-option>
              <a-select-option :value="0">不可见</a-select-option>
              <a-select-option :value="1">仅我可见</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="w-t-right">
          <a-form-item>
            <a-range-picker v-model="releaseDate" format="YYYY-MM-DD" class="mr-24" @change="handleDate" />
          </a-form-item>
          <a-form-item>
            <a-input-search
              v-model="keywords"
              placeholder="搜索关键词"
              style="width: 150px"
              @search="searchData"
            />
          </a-form-item>
          <a-button type="primary" icon="search" @click="searchData">查询</a-button>
          <a-button type="primary" icon="reload" @click="searchReset">重置</a-button>
        </div>
      </a-form>
    </div>
    <a-spin :spinning="loading">
      <div class="w-full" style="min-height: 600px">
        <div
          v-for="(re, index) in data"
          :key="index"
          class="w-m-content flex"
        >
          <video
            v-if="re.videoUrl !== ''"
            controls
            :src="re.videoUrl"
            :poster="re.videoUrl + '?x-oss-process=video/snapshot,t_0000,f_jpg'"
          />
          <a v-else href="#">
            <img
              :src="re.firstImg"
              alt=""
            /></a>
          <div class="w-full">
            <div class="flex justify-between items-center">
              <h3>
                <a href="#">{{ re.title }}</a>
              </h3>
              <p>{{ formatTime(re.releaseDate) }}</p>
            </div>
            <div class="w-m-sign flex">
              <p> {{ re.state===0?'草稿': re.state===1 ?'已发布': re.state===2?'待审核':'已拒绝' }}</p>
              <p v-if="re.onlyStick === 1">
                置顶
              </p>
              <p v-if="re.original !==0">{{ re.original===0?'':'原创' }}</p>
            </div>
            <div class="mt-32 flex">
              <div>
                <span>阅读 {{ re.clickNum }}</span>
                <span>点赞 {{ re.praiseNum }}</span>
                <span>评论 {{ re.commentNum }}</span>
              </div>
              <div style="flex:1 0 auto" class="cursor-pointer">
                <span>查看数据</span>
                <span>查看评论</span>
                <span>
                  <a-button
                    type="link"
                    :disabled="re.state===1||re.state===2"
                    :style="{
                      color:
                        re.state===1||re.state===2
                          ? '#bfbfbf'
                          : ''
                    }"
                    @click="editListClick(re.id,re.state)"
                  >
                    编辑
                  </a-button>
                </span>
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
                        <a-popconfirm
                          title="同时仅支持一篇内容置顶，若已经你置顶其他内容，此内容将取代它作为置顶内容。"
                          ok-text="确定"
                          cancel-text="取消"
                          @confirm="stickWorkClick(re.onlyStick === 1?0:1,re.id)"
                        >
                          <a v-if="re.onlyStick === 1" href="#">
                            取消置顶
                          </a>
                          <a v-else href="#">
                            置顶
                          </a>
                        </a-popconfirm>
                      </a-menu-item>
                      <a-menu-item key="3">
                        <a-popconfirm
                          title="确定执行此操作？。"
                          ok-text="确定"
                          cancel-text="取消"
                          @confirm="onlyMeClick(re.only === 1?0:1,re.id)"
                        >
                          <a v-if="re.only === 1" href="#">
                            设为公开
                          </a>
                          <a v-else href="#">
                            设为仅我可见
                          </a>
                        </a-popconfirm>
                      </a-menu-item>
                      <a-menu-item key="4">
                        <a href="javascript:;">关闭评论</a>
                      </a-menu-item>
                      <a-menu-item key="5">
                        <a href="javascript:;">
                          <a-popconfirm
                            title="确定执行此操作？"
                            ok-text="确定"
                            cancel-text="取消"
                            @confirm="deleteMedia(re.id)"
                          >
                            删除作品
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
  </div>
</template>

<script>
import store from '@/store'
import { formatTime } from '@/utils/time'

export default {
  name: 'WorksList',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      releaseDate: [],
      state: '',
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      pageSize: 10,
      pageNumber: 1,
      keywords: '',
      releaseDateGte: '',
      releaseDateLte: '',
      only: ''
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    deleteMedia(id) {
      this.$api.work.deleteDraftBox({
        id: id
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loadData()
        }
      })
    },
    editListClick(id, state) {
      if (id && (state === 0 || state === 3)) {
        this.$router.push({
          path: 'publish/index/',
          query: { id: id }
        })
      }
    },
    onlyMeClick(num, value) {
      this.$api.work.onlyMe({
        id: value,
        userId: store.state.user.userId,
        isOnly: num
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loadData()
        }
      })
    },
    stickWorkClick(num, value) {
      this.$api.work.stickWork({
        id: value,
        userId: store.state.user.userId,
        isStick: num
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loadData()
        }
      })
    },
    searchReset() {
      this.keywords = ''
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
        releaseDateGte: this.releaseDateGte,
        releaseDateLte: this.releaseDateLte,
        state: this.state,
        only: this.only
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
        releaseDateLte: this.releaseDateLte,
        state: this.status,
        only: 0
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
    }
    .w-m-sign {
      p {
        margin-right: 8px;
        font-size: 12px;
        &:nth-child(2),
        &:nth-child(3) {
          color: #3d89ff;
          padding: 0 6px;
          background-color: #e6f0ff;
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
    span {
      cursor: pointer;
        //  min-width: 68px;
      font-size: 14px;
      font-weight: 400;
      margin-left: 12px;
      color: rgba(0, 0, 0, 0.85);
      transition: all 0.3s ease-in-out;
      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
}
</style>
