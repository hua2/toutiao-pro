<template>
  <div class="publish-qa">
    <page-header-wrapper :title="false">
      <div class="relative">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="推荐">
            <QuestionModal
              title="美国的军事实力相当于多少个国家的总和？"
              num="458"
              number="834"
              :show="true"
            />
          </a-tab-pane>
          <a-tab-pane key="2" tab="热门问题" force-render>
            热门问题
          </a-tab-pane>
          <a-tab-pane key="3" tab="邀请我答">
            邀请我答
          </a-tab-pane>
          <a-tab-pane key="4" tab="收藏">
            <div class="mt-64">
              <a-empty description="暂无收藏，去推荐看看吧~" />
            </div>
          </a-tab-pane>
        </a-tabs>
        <div class="p-q-search">
          <a-input-search
            placeholder="搜索关键词"
            style="width: 200px"
            @search="onSearch"
          />
          <a-button class="ml-24">提问</a-button>
        </div>
      </div>
    </page-header-wrapper>
  </div>

</template>

<script>
import QuestionModal from '@/views/publish/components/QuestionModal'
export default {
  name: 'Question',
  components: { QuestionModal },
  data() {
    return {}
  },
  methods: {
    onSearch(value) {
      console.log(value)
    },
    callback(key) {
      console.log(key)
    }
  }
}
</script>

<style scoped lang="less">
.publish-qa {
  width: 100%;
  .p-q-search{
    position: absolute;
    right: 0;
    top: 12px;
  }
}
</style>
