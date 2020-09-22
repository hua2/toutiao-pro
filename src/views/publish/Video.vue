<template>
  <div class="article">
    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <a-icon type="arrow-left" />
        <span> {{ navActive }}</span>
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item
          v-for="(e, index) in navData"
          :key="index"
          @click="onPublishClick(e)"
        >
          <a href="#"> {{ e.name }}</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Video',
  components: { },
  data() {
    return {
      navActive: '发布视频',
      navData: [
        {
          name: '发布文章'
        },
        {
          name: '发布视频'
        },
        {
          name: '发布问答'
        }
      ]
    }
  },
  methods: {
    onPublishClick(e) {
      this.navActive = e.name
    }
  }
}
</script>

<style scoped lang="less">
.article {
  width: 100%;
  span {
    cursor: pointer;
    font-size: 16px;
    color: #222;
    font-weight: 600;
  }
}
</style>
