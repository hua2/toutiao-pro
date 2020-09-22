<template>
  <div class="home flex justify-between">
    <div class="home-left">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card :hoverable="true">
            <p>粉丝数</p>
            <strong>1,827</strong>
            <span>昨日无变化</span>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card :hoverable="true">
            <p>总阅读(播放)量</p>
            <strong>1,827</strong>
            <span>今日无变化</span>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card :hoverable="true">
            <p>关注量</p>
            <strong>1,827</strong>
            <span>昨日无变化</span>
          </a-card>
        </a-col>
      </a-row>
      <div class="mt-24">
        <img
          src="https://p6-tt-ipv6.byteimg.com/obj/pgc-image/4fb802cc9d1b4f168152b19b98245067"
          alt=""
        />
      </div>
    </div>
    <div class="home-right">
      <a-card style="width:100%" title="公告">
        <a slot="extra" href="#">更多</a>
        <ul>
          <li>09-16 西瓜视频呼吁广大创作者共同保护长江生态公告</li>
          <li>
            今日头条规范网络传播秩序专项行动公告（第八期） 09-10
            创作中心新版本上线公告
          </li>
          <li>09-16 西瓜视频呼吁广大创作者共同保护长江生态公告</li>
          <li>
            09-10 关于头条号后台上线「巨量星图」的公告
          </li>
          <li>
            今日头条规范网络传播秩序专项行动公告（第八期） 09-10
            创作中心新版本上线公告
          </li>
          <li>09-16 西瓜视频呼吁广大创作者共同保护长江生态公告</li>
        </ul>
      </a-card>
      <br /><br />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.home {
  width: 100%;
  .home-left {
    width: 66%;
    text-align: center;
    .ant-card {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    strong {
      text-align: center;
      font-size: 32px;
      font-weight: 700;
      line-height: 54px;
      margin-top: 5px;
      margin-bottom: 8px;
      height: 54px;
      white-space: nowrap;
    }
    span {
      display: block;
      height: 24px;
      border-radius: 12px;
      background: #faf5ff;
      padding: 2px 12px;
    }
  }
  .home-right {
    width: 32%;
    li {
      margin: 6px;
    }
  }
}
</style>
