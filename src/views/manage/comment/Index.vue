<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="全部">
        <CommonPage />
      </a-tab-pane>
      <a-tab-pane key="2" tab="图文" force-render>
        <graphic />
      </a-tab-pane>
      <a-tab-pane key="3" tab="视频">
        <Graphic />
      </a-tab-pane>
      <a-tab-pane key="4" tab="问答">
        问答
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import CommonPage from '@/views/manage/comment/all/Index'
import Graphic from '@/views/manage/comment/graphic/Index'
export default {
  name: 'Index',
  components: { Graphic, CommonPage },
  data() {
    return {}
  },
  methods: {
    callback(key) {
      console.log(key)
    }
  }
}
</script>

<style scoped></style>
