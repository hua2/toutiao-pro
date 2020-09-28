<template>
  <div class="publish-question">
    <page-header-wrapper :title="false">
      <template v-slot:content>
        <QuillEditor v-model="content" class="p-q-editor" />
      </template>
      <QuestionModal title="尿酸升高了，手脚有什么症状？如何清除呢？" num="24" number="321" :show="false" />
      <div class="flex justify-between items-center mt-24">
        <div>
          <span class="mr-24">声明原创</span>
          <a-checkbox @change="onChange">
            声明原创
          </a-checkbox>
        </div>
        <a-button type="primary">发布</a-button>
      </div>
    </page-header-wrapper>
  </div>
</template>

<script>
import QuillEditor from '@/components/Editor/QuillEditor'
import QuestionModal from '@/views/publish/components/QuestionModal'
export default {
  name: 'PublishQuestion',
  components: { QuestionModal, QuillEditor },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    onChange(checkedValues) {
      console.log('checked = ', checkedValues)
    }
  }
}
</script>

<style scoped lang="less">
  .publish-question{
    width: 100%;
    .p-q-editor {
      width: 100%;
      /deep/ .ql-container.ql-snow {
        min-height: 320px;
      }
    }
  }

</style>
