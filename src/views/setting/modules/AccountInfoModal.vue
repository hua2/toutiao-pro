<template>
  <div>
    <a-modal
      title="编辑用户简介"
      :visible="visible"
      :confirm-loading="confirmLoading"
      width="420px"
      cancel-text="取消"
      ok-text="保存"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-textarea
        v-model="userInfo"
        maxlength="30"
        :rows="1"
        @input="descInput"
      ></a-textarea>
      <span>{{ remnant }}/30</span>
      <p class="text-12 mt-6">
        本月还能编辑简介 5
        次，要求内容完整通顺，无特殊符号，请勿添加任何联系方式如微博、手机号、QQ
      </p>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'AccountInfoModal',
  data() {
    return {
      remnant: 0,
      userInfo: '',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    descInput() {
      const txtVal = this.userInfo.length
      this.remnant = 0 + txtVal
    },
    showInfoModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log('Clicked e', e)
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
        this.handleClear()
      }, 2000)
    },
    handleClear() {
      this.userInfo = ''
      this.remnant = 0
    },
    handleCancel(e) {
      console.log('Clicked cancel button', e)
      this.visible = false
      this.handleClear()
    }
  }
}
</script>
<style scoped lang="less">
</style>
