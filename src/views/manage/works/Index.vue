<template>
  <div class="works">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="全部">
        <WorksList />
      </a-tab-pane>
      <a-tab-pane key="2" tab="图文" force-render>
        <WorksList type="0" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="视频">
        <WorksList type="1" />
      </a-tab-pane>
      <a-tab-pane key="4" tab="问答">
        <WorksList type="2" />
      </a-tab-pane>
      <a-tab-pane key="5">
        <span slot="tab">
          <a-divider type="vertical" />草稿箱
        </span>
        <DraftBoxList type="" :state="0" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import WorksList from '@/views/manage/works/components/WorksList'
import DraftBoxList from '@/views/manage/works/components/DraftBoxList'
export default {
  name: 'Index',
  components: { DraftBoxList, WorksList },
  data() {
    return {
    }
  },
  methods: {
    callback(key) {
      console.log(key)
    },
    onChange(date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>

<style scoped lang="less">
.works {
  width: 100%;
}
</style>
