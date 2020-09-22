<template>
  <div class="article">
    <page-header-wrapper>
      <template v-slot:content>
        <QuillEditor v-model="content" />
      </template>
      <template v-slot:extraContent>
        <a-button @click="openDialog">Dialog Test</a-button>
      </template>
    </page-header-wrapper>
  </div>

</template>

<script>
import QuillEditor from '@/components/Editor/QuillEditor'
export default {
  name: 'Index',
  components: { QuillEditor },
  data() {
    return {
      content: '',
      navActive: '发布文章',
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
    openDialog() {
      this.$dialog('你好')
      this.$success('你好')
    },
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
