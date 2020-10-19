<template>
  <div class="publish-question">
    <page-header-wrapper :title="false">
      <h3>什么样的人不适合做管理者？</h3>
      <div class="q-m-info flex justify-between">
        <div class="flex">
          <div class="mr-24">回答 123</div>
          <div>收藏 456</div>
        </div>
        <div class="flex cursor-pointer">
          <div>123</div>
<!--          <div-->
<!--            v-if="a.isCollect === 0"-->
<!--            @click="collectClick(a.id, 1)"-->
<!--          ><a-icon type="star" />收藏</div>-->
<!--          <div-->
<!--            v-else-->
<!--            @click="collectClick(a.id, 0)"-->
<!--          ><a-icon type="star" />已收藏</div>-->
        </div>
      </div>
        <QuillEditor @change="onEditorChange" class="p-q-editor" />
      <div class="flex justify-between items-center mt-32">
        <div>
          <a-form-item label="声明原创：" required>
            <a-radio-group v-model="original">
              <a-radio :value="1">原创</a-radio>
              <a-radio :value="0">转载</a-radio>
            </a-radio-group>
          </a-form-item>
        </div>
        <a-button type="primary" @click="saveInfo('2')">发布</a-button>
      </div>
      <QuestionList />
    </page-header-wrapper>
  </div>
</template>

<script>
import QuillEditor from '@/components/Editor/QuillEditor'
import QuestionList from '@/views/publish/components/QuestionList'
export default {
  name: 'PublishQuestion',
  components: { QuestionList, QuillEditor },
  data() {
    return {
      content: '',
      original: 1,
      isLoading: false,
      id: this.$route.query.id
    }
  },
  methods: {
    onEditorChange(val) {
      this.content = val
    },
    saveInfo(type) {
      this.isLoading = true
      this.$api.work.publishMedia({
        type: type,
        uid: this.$store.state.user.userId,
        content: this.content,
        original: this.original,
        pid: this.id
      }).then(res => {
        this.isLoading = false
        if (res.status === 'SUCCESS') {
          this.$message.success('发布成功')
          this.$router.push('/manage/works/index')
        } else {
          this.$message.warning(res.message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .publish-question{
    width: 100%;
    h3{
      font-weight: 700;
      color: #222;
      margin-bottom: 8px;
      font-size: 16px;
    }
    .q-m-info{
      line-height: 28px;
      font-size: 14px;
    }
    .p-q-editor {
      width: 100%;
      margin-top: 12px;
      /deep/ .ql-container.ql-snow {
        min-height: 320px;
      }
    }
    /deep/ .ant-form-item{
      display: flex;
    }
  }

</style>
