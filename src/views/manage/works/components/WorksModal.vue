<template>
  <div class="works-modal mt-24">
    <div class="w-m-content flex">
      <a href="#">
        <img
          src="https://p9-tt-ipv6.byteimg.com/large/pgc-image/8f10eb28d01d412c9082fd4e1ade307b"
          alt=""
        /></a>
      <div class="w-full">
        <div class="flex justify-between items-center">
          <h3><a href="#">明阳风机商业秘密疑被侵犯案引发业内质疑</a></h3>
          <p>07-02 17:11</p>
        </div>
        <div class="w-m-sign flex">
          <p>已发布</p>
          <p>已推送</p>
          <p>原创</p>
        </div>
        <div class="flex justify-between mt-32">
          <div>
            <span>展现 7907</span>
            <span>阅读 7907</span>
            <span>点赞 7907</span>
            <span>评论 7907</span>
            <span>展现 7907</span>
          </div>
          <div style="flex:1 0 auto">
            <span>查看数据</span>
            <span>查看评论</span>
            <span>编辑</span>
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
                    <a href="javascript:;">置顶</a>
                  </a-menu-item>
                  <a-menu-item key="3">
                    <a href="javascript:;">设为仅我可见</a>
                  </a-menu-item>
                  <a-menu-item key="4">
                    <a href="javascript:;">关闭评论</a>
                  </a-menu-item>
                  <a-menu-item key="5">
                    <a href="javascript:;">删除作品</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorksModal',
  data() {
    return {}
  },
  methods: {
    onClick({ key }) {
      console.log(`Click on item ${key}`)
    }
  }
}
</script>

<style scoped lang="less">
.works-modal {
  width: 100%;
  .w-m-content {
    padding: 24px 0;
    border-bottom: 1px solid #e8e8e8;
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
    }
    span {
      cursor: pointer;
        //  min-width: 68px;
      font-size: 14px;
      font-weight: 400;
      margin-left: 12px;
      color: rgba(0, 0, 0, 0.85);
      transition: all 0.3s ease-in-out;
      &:first-child {
        margin-left: unset;
      }
      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
}
</style>
