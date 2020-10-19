<template>
  <div class="publish-qa">
    <page-header-wrapper :title="false">
      <div class="relative">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="推荐">
            <QuestionList :show="true" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="收藏">
            <QuestionCollectList />
          </a-tab-pane>
        </a-tabs>
      </div>
    </page-header-wrapper>
  </div>

</template>

<script>
import QuestionList from '@/views/publish/components/QuestionList'
import QuestionCollectList from '@/views/publish/components/QuestionCollectList'
export default {
  name: 'Question',
  components: { QuestionCollectList, QuestionList },
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

<style scoped lang="less">
.publish-qa {
  width: 100%;
}
</style>
