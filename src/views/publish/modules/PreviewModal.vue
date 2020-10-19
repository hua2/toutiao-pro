<template>
  <div>
    <a-modal
      title="角马能源"
      :visible="visible"
      :confirm-loading="confirmLoading"
      width="375px"
      cancel-text="取消"
      ok-text="确定"
      class="article-modal"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="a-m-content">
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'PreviewModal',
  data() {
    return {
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    showPreviewModal() {
      this.visible = true
    },
    handleOk(e) {
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      this.visible = false
    }
  }
}
</script>
<style scoped lang="less">
  .article-modal {
    /deep/ .ant-modal-header{
      text-align: center;
      border-radius: 40px 40px 0 0;
    }
  }
</style>
