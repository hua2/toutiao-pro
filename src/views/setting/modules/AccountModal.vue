<template>
  <div>
    <a-modal
      title="编辑用户名"
      :visible="visible"
      :confirm-loading="confirmLoading"
      width="420px"
      cancel-text="取消"
      ok-text="保存"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-textarea
        v-model="userName"
        maxlength="10"
        :rows="1"
        @input="descInput"
      ></a-textarea>
      <span>{{ remnant }}/10</span>
      <p class="text-12 mt-6">
        本月还能编辑用户名 1
        次，请勿使用包含特殊符号或含有明显营销推广意图的用户名
      </p>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'AccountModal',
  data() {
    return {
      remnant: 0,
      userName: '',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    descInput() {
      const txtVal = this.userName.length
      this.remnant = 0 + txtVal
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log('Clicked e', e)
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button', e)
      this.visible = false
    }
  }
}
</script>
<style scoped lang="less">
/*/deep/ {*/
  .ant-modal-header {
    border-bottom: unset;
  }
  .ant-modal-body {
    span {
      position: absolute;
      right: 32px;
      margin: 6px;
    }
  }
  .ant-modal-footer {
    border-top: unset;
    padding-bottom: 24px;
  }
/*}*/
</style>
