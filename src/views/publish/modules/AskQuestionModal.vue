<template>
  <div>
    <a-modal
      title="提问"
      :visible="visible"
      :confirm-loading="confirmLoading"
      width="720px"
      cancel-text="取消"
      ok-text="确定"
      class="ask-question-modal"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="mb-16">
        <a-textarea
          v-model="title"
          maxlength="30"
          :rows="1"
          @input="descInput"
        ></a-textarea>
        <span>{{ remnant }}/30</span>
      </div>
      <div class="a-m-content">
        <div class="mt-24">
          <a-upload
            name="firstImg"
            accept="image/*"
            list-type="picture-card"
            :show-upload-list="false"
            class="pic-upload"
            :custom-request="(e=>handleUpload(e,'firstImg'))"
            :before-upload="beforeUpload"
          >
            <img v-if="urls.firstImg" :src="urls.firstImg" alt="avatar" />
            <div v-else>
              <a-icon :type="uploading.firstImg ? 'loading' : 'plus'" />
            </div>
          </a-upload>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'AskQuestionModal',
  data() {
    return {
      visible: false,
      confirmLoading: false,
      uploading: {
        firstImg: false
      },
      urls: {
        firstImg: null
      },
      remnant: 0,
      title: '',
      id: undefined
    }
  },
  methods: {
    descInput() {
      const txtVal = this.title.length
      this.remnant = 0 + txtVal
    },
    showAskQuestionModal() {
      this.visible = true
    },
    handleOk(e) {
      this.confirmLoading = true
      this.$api.work.publishMedia({
        ...this.urls,
        type: 2,
        uid: this.$store.state.user.userId,
        title: this.title
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.$message.success('发布成功')
          this.$router.push('/manage/works/index')
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    handleCancel(e) {
      this.visible = false
    },
    handleUpload(e, type) {
      this.uploading[type] = true
      this.$api.work.uploadPicture(e.file, 0)
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.urls[type] = res.data
            this.uploading[type] = false
            this.$message.success('上传成功')
          }
        })
        .catch(error => {
          console.log(error)
          this.$message.error('upload error!')
        })
    },
    beforeUpload(file) {
      if (!file.type.startsWith('image')) {
        this.$message.error('请上传图片')
        return false
      }
      return true
    }
  }
}
</script>
<style scoped lang="less">
  .ask-question-modal {
    .pic-upload{
      img{
        width: 88px;
        height: 88px;
      }
    }
    /deep/ .ant-modal-body {
      textarea.ant-input{
        border: unset;
        border-bottom: 1px solid #e8e8e8;
      }
      .ant-upload-picture-card-wrapper{
        position: unset;
        right: unset;
        margin: unset;
      }
      .a-m-content{
        span{
          position: unset;
        }
      }
  }
  }
</style>
