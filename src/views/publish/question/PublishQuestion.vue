<template>
  <div class="publish-question">
    <page-header-wrapper>
      <template v-slot:content>
        <QuillEditor v-model="content" />
      </template>
    </page-header-wrapper>
    <QuestionModal />
    <a-form>
      <a-form-item label="声明原创" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <a-checkbox @change="onChange">
          声明原创
        </a-checkbox>
      </a-form-item>
    </a-form>
    <a-button>发布</a-button>
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
  }

</style>
