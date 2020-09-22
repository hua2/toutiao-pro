<template>
  <div class="works relative">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="全部">
        <div class="works-tab">
          <a-tabs default-active-key="6" @change="callback">
            <a-tab-pane key="5" tab="状态" disabled />
            <a-tab-pane key="6" tab="全部" force-render>
              共 136 条内容
              <WorksModal />
              <div class="flex justify-end mt-32">
                <a-pagination v-model="current" :total="50" show-less-items />
              </div>
            </a-tab-pane>
            <a-tab-pane key="7" tab="已发布">
              已发布
            </a-tab-pane>
            <a-tab-pane key="8" tab="审核中">
              审核中
            </a-tab-pane>
            <a-tab-pane key="9" tab="未通过">
              未通过
            </a-tab-pane>
            <a-tab-pane key="10" tab="仅我可见">
              仅我可见
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="works-data">
          <a-range-picker @change="onChange" />
          <a-input-search
            placeholder="搜索关键词"
            style="width: 140px;margin-top: 12px"
            @search="onSearch"
          />
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="图文" force-render>
        图文
      </a-tab-pane>
      <a-tab-pane key="3" tab="视频">
        视频
      </a-tab-pane>
      <a-tab-pane key="4" tab="问答">
        问答
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import WorksModal from '@/views/manage/works/components/WorksModal'
export default {
  name: 'Index',
  components: { WorksModal },
  data() {
    return {
      current: 2
    }
  },
  methods: {
    callback(key) {
      console.log(key)
    },
    onChange(date, dateString) {
      console.log(date, dateString)
    },
    onSearch(value) {
      console.log(value)
    }
  }
}
</script>

<style scoped lang="less">
.works {
  width: 100%;
  .works-tab {
    /*/deep/ {*/
      .ant-tabs-bar {
        border-bottom: unset;
      }
      .ant-tabs {
        min-height: 480px;
      }
    }
  /*}*/
  .works-data {
    position: absolute;
    right: 12px;
    top: 58px;
    .ant-calendar-picker {
      width: 280px;
      margin-top: 12px;
      margin-right: 8px;
    }
  }
}
</style>
