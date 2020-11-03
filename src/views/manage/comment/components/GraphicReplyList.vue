<template>
  <div class="graphic-reply">
    <a-spin :spinning="loading">
      <div class="w-full" style="min-height: 300px">
        <div
          v-for="(g, index) in data"
          :key="index"
          class="c-l-left"
        >
          <div class="mt-24">
            <div class="g-r-top flex items-center">
              <img
                :src="g.headPicUrl"
                alt=""
              />
              <strong><a href="#">{{ g.nickName }}</a></strong>
            </div>
            <div class="g-r-content mt-8">
              <p>
                <span v-if="g.stick === 1" class="g-r-c-top mr-6 text-center">
                  置顶
                </span>
                {{ g.content }}
              </p>
            </div>
            <div class="g-r-reply mt-12 flex items-center justify-between">
              <div>{{ formatTime(g.updateDate) }}</div>
              <div class="flex">
                <p @click="replyClick(g)">{{ g.show?'取消回复':'回复' }} <span v-if="g.commentNum">{{ g.commentNum }}</span></p>
                <p> <span
                      v-if="g.isPraise === 0"
                      @click="praiseCommentMedia(g.id, 1)"
                    ><a-icon type="star" />点赞</span>
                  <span v-else @click="praiseCommentMedia(g.id, 0)"><a-icon type="star" />{{ g.praiseNum }}</span>
                </p>
                <p>
                  <a-popconfirm
                    title="确定置顶此内容？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="mediaCommentStick(g.stick === 1?0:1,g.id,g.aid)"
                  >
                    <a v-if="g.stick === 0" href="#">
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
                            @confirm="deleteCommentMedia(g.id)"
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
            <div v-if="g.show" class="mt-16 mb-12">
              <a-textarea
                v-model="content"
                placeholder="积极回复可吸引更多人评论"
                :rows="4"
              />
              <div class="flex justify-end mt-12">
                <a-button type="primary" :disabled="content===''" @click="publishComment(graphicReplyData.type,g.aid,g.id,g.uid)">发布</a-button>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="showLoadingMore && data.length !== 0"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
        >
          <a-spin v-if="loadingMore" />
          <a-button v-else class="mt-24" @click="onLoadMore()">
            loading more
          </a-button>
        </div>
        <div v-else class="mt-64">
          <a-empty description="暂无评论" />
        </div>
      </div>
    </a-spin>
    <SecondReplyList ref="secondReplyList" @changeList="loadViewData"/>
  </div>
</template>

<script>
import store from '@/store'
import { formatTime } from '@/utils/time'
import SecondReplyList from '@/views/manage/comment/components/SecondReplyList'

export default {
  name: 'GraphicReplyList',
  components: { SecondReplyList },
  data() {
    return {
      graphicReplyData: {
        id: '',
        aid: '',
        uid: '',
        isPraise: 0,
        stick: 0,
        type: 0
      },
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      pageSize: 10,
      pageNumber: 1,
      content: ''
    }
  },
  methods: {
    loadViewData() {
      this.loading = true
      this.$api.work.findPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        uid: store.state.user.userId,
        aid: this.graphicReplyData.id,
        type: this.graphicReplyData.type
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
        uid: store.state.user.userId,
        aid: this.graphicReplyData.id,
        type: this.graphicReplyData.type
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
          this.loadViewData()
        }
      })
    },
    replyClick(data) {
      data.show = !data.show
      this.$refs.secondReplyList.show = data.show
      if (data.show) {
        this.data = this.data.map(d => {
          d.show = false
          return d
        })
        this.content = ''
        data.show = true
        this.$refs.secondReplyList.replyData = data
        this.$refs.secondReplyList.loadData()
      }
      this.$forceUpdate()
    },
    mediaCommentStick(num, value, aid) {
      this.$api.work.mediaCommentStick({
        id: value,
        aid: aid,
        isStick: num
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.loadViewData()
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
            this.loadViewData()
          }
        })
    },
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
          this.loadViewData()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.graphic-reply{
  .g-r-top {
    img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
    strong {
      margin: 0 8px;
      white-space: nowrap;
    }
  }
  .g-r-content {
    .g-r-c-top {
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
  .g-r-reply {
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
</style>
