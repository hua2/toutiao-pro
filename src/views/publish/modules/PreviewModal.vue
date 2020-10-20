<template>
  <div>
    <a-modal
      title="角马能源"
      :visible="visible"
      :confirm-loading="confirmLoading"
      width="375px"
      cancel-text="取消"
      ok-text="确定"
      class="preview-modal"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="p-m-content">
        <h3> {{ formData.title }} </h3>
        <div class="flex">
          <img :src="account.headPicUrl" alt="">
          <div>
            <strong>{{ account.nickName }}</strong>
            <p>2020-1--20 11:06</p>
          </div>
        </div>
        <div>
          <p v-html="formData.content"></p>
        </div>
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
      confirmLoading: false,
      formData: {}
    }
  },
  computed: {
    account() {
      return this.$store.state.user.info
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
  .preview-modal {
    /deep/ .ant-modal{
      padding: 8px 10px;
      background: url("https://s1.pstatp.com/pgc/v2/mp-static/graphic/a13e1fbe4fce48871963a6829172e026.png");
      background-size: 100% 100%;
    }
    /deep/ .ant-modal-header{
      text-align: center;
      border-radius: 40px 40px 0 0;
      border-bottom: 1px solid #e8e8e8;
    }
    /deep/ .ant-modal-content{
      border-radius: 40px;
    }
    /deep/ .ant-modal-body {
      padding: 12px;
    }
    /deep/ .ant-modal-footer{
      display: none;
    }
    .p-m-content{
      height: 620px;
      overflow: scroll;
      h3{
        font-size: 24px;
        color: #222;
        font-weight: 500;
        margin-bottom: 16px;
      }
      img{
        width: 37px;
        height: 37px;
        margin-right: 8px;
        border-radius: 20px;
      }
      strong{
        color: #222;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 2px;
      }
      p{
        color: #999;
        font-size: 12px;
      }
    }
  }
</style>
