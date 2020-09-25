<template>
  <div class="question-modal">
    <div class="q-m-list">
      <div class="q-m-item">
        <h3>{{ title }}</h3>
        <div class="q-m-info flex justify-between">
          <div class="flex">
            <div class="mr-24">回答 {{ num }}</div>
            <div>收藏 {{ number }}</div>
          </div>
          <div v-if="show" class="flex">
            <span class="q-m-btn text-red-500 mr-24" @click="$router.push('/publish/publishQuestion')">
              <a-icon type="edit" />
              写回答
            </span>
            <div class="q-m-btn" @click="collectClick">
              <a-icon type="star" />
              {{ showCollect ? "取消收藏" : "收藏问题" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionModal',
  props: {
    title: {
      required: true,
      type: String,
      default: ''
    },
    num: {
      required: true,
      type: String,
      default: ''
    },
    number: {
      required: true,
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showCollect: false
    }
  },
  methods: {
    collectClick() {
      this.showCollect = !this.showCollect
      this.$message.success('操作成功')
    }
  }
}
</script>

<style scoped lang="less">
  .question-modal{
    width: 100%;
.q-m-list{
  width: 100%;
  .q-m-item{
    padding: 24px 0;
    border-bottom:1px solid #e8e8e8 ;
    h3{
      font-size: 16px;
      font-weight: 700;
      line-height: 1.5;
      cursor: pointer;
      color: #222;
    }
    .q-m-info{
      margin-top: 16px;
      line-height: 28px;
      font-size: 14px;
    }
    .q-m-btn{
      min-width: 90px;
      cursor: pointer;
    }
  }
}
  }

</style>
