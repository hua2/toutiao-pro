<template>
  <div class="account-item">
    <div class="account-item-wrapper">
      <div class="label">{{ title }}</div>
      <div class="content">
        <div v-if="content">{{ content }}</div>
        <img v-if="img" :src="img" alt="" />
        <a href="#" @click="editClick">{{ edit }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoModal',
  props: {
    title: {
      required: true,
      type: String,
      default: ''
    },
    content: {
      required: false,
      type: String,
      default: ''
    },
    edit: {
      required: false,
      type: String,
      default: ''
    },
    img: {
      required: false,
      type: String,
      default: ''
    }
  },
  methods: {
    editClick() {
      this.$emit('update')
    }
  }
}
</script>

<style scoped lang="less">
.account-item {
  padding: 24px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  .account-item-wrapper {
    flex: 1;
    display: -webkit-box;
    .label {
      width: 142px;
    }
    .content {
      -webkit-box-flex: 1;
      color: #666;
      display: flex;
      justify-content: space-between;
      img {
        width: 60px;
        height: 60px;
        border: 1px solid #e8e8e8;
        background-color: #e8e8e8;
      }
      a {
        color: #1356bd;
        border: unset;
        background: #fff;
        min-width:56px;
        text-align: right;
      }
    }
  }
}
</style>
