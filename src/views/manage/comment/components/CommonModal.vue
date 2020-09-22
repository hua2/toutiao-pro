<template>
  <div class="common-modal">
    <div class="c-p-left">
      <div class="c-p-top flex items-center">
        <img
          src="https://sf6-ttcdn-tos.pstatp.com/img/pgc-image/eeef41c1c02544a3ae8f494f10c2e928~120x256.image"
          alt=""
        />
        <strong><a href="#">贺宇峰</a></strong>
        评论了文章
        <span><a href="#">垃圾垃圾；安靠 </a></span>
      </div>
      <div class="c-p-content flex flex-col mt-8">
        <div v-if="showTop" class="c-p-c-top mr-6 text-center">
          置顶
        </div>
        <p>
          施耐德是法国的吧施耐德是法国的吧施耐德是法国的吧施耐德是法国的吧施耐德是法国的吧施耐德是法国的吧施耐德是法国的吧施耐德是法国的吧
        </p>
        <div class="c-p-reply mt-12 flex items-center justify-between">
          <div>08-04 16:51</div>
          <div class="flex">
            <p>回复</p>
            <p>赞</p>
            <p @click="topClick">
              {{ showTop ? "取消置顶" : "置顶" }}
            </p>
            <p>
              <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                  ...
                </a>
                <a-menu slot="overlay" @click="onClick">
                  <a-menu-item key="1">
                    <a href="javascript:;">举报</a>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a href="javascript:;">删除</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div></template>

<script>
export default {
  name: 'CommonModal',
  data() {
    return {
      showTop: false
    }
  },
  methods: {
    onClick({ key }) {
      console.log(`Click on item ${key}`)
    },
    topClick() {
      this.showTop = !this.showTop
      this.$message.success('操作成功')
    }
  }
}
</script>

<style scoped lang="less">
.common-modal {
  width: 50%;
  .c-p-left {
    width: 100%;
    cursor: pointer;
    padding: 20px 32px;
    border-bottom: 1px solid #e2e8f0;
    .c-p-top {
      img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
      strong,
      span {
        color: var(--black02);
        margin: 0 8px;
        transition: all 0.3s ease-in-out;
      }
    }
    .c-p-content {
      .c-p-c-top {
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
    .c-p-reply {
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
