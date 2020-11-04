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
        v-model="message"
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
      message: '',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    descInput() {
      const txtVal = this.message.length
      this.remnant = 0 + txtVal
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.confirmLoading = true
      this.$api.user
        .updateNickName({
          id: this.$store.state.user.userId,
          nickName: this.message
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.visible = false
            this.confirmLoading = false
            this.$store.dispatch('GetInfo')
            this.handleClear()
          }
        })
    },
    handleClear() {
      this.message = ''
      this.remnant = 0
    },
    handleCancel(e) {
      this.visible = false
      this.handleClear()
    }
  }
}
</script>
<style scoped lang="less">
</style>
