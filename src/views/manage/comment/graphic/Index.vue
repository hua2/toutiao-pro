<template>
  <div class="graphic flex">
    <div class="graphic-left">
      <a-input-search
        placeholder="搜索作品标题"
        style="max-width: 312px"
        @search="onSearch"
      />
      <div class="graphic-list flex mt-8">
        <a href="#">
          <img
            src="https://p6-tt-ipv6.byteimg.com/large/pgc-image/8f10eb28d01d412c9082fd4e1ade307b"
            alt=""
          /></a>
        <div class="g-l-title ml-12">
          <a href="#">明阳风机商业秘密疑被侵犯案引发业内质疑明阳风机商业秘密疑被侵犯案引发业内质疑</a>
          <p>评论 0</p>
        </div>
      </div>
    </div>
    <div class="graphic-right pl-32">
      <div class="flex items-center">
        <h3>排序：</h3>
        <a-input-group compact>
          <a-select default-value="Option1" style="width: 160px">
            <a-select-option value="Option1">
              最新
            </a-select-option>
            <a-select-option value="Option2">
              最热
            </a-select-option>
          </a-select>
        </a-input-group>
      </div>
      <div class="w-full mt-16">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Graphic',
  components: { },
  data() {
    return {
      form: {
        region: ''
      }
    }
  },
  methods: {
    onSearch(value) {
      console.log(value)
    }
  }
}
</script>

<style scoped lang="less">
.graphic {
  width: 100%;
  margin-top: 32px;
  .c-p-left {
    width: 100%;
  }
  .graphic-left {
    width: 100%;
    padding: 0 20px;
    overflow: hidden;
    border-right: 1px solid #e2e8f0;
    .graphic-list {
      width: 100%;
      padding: 24px 32px 24px 0;
      border-bottom: 1px solid #e2e8f0;
      img {
        width: 72px;
        height: 72px;
        border-radius: 2px;
        background-size: cover;
      }
      .g-l-title {
        font-size: 14px;
        a {
          line-height: 24px;
          height: 48px;
          max-height: 48px;
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
    width: 66.6%;
    h3 {
      width: 60px;
    }
  }
}
</style>
