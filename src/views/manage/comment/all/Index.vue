<template>
  <div class="common-page flex mt-24">
    <CommonModal />
    <CommonReplyModal />
  </div>
</template>

<script>
import CommonModal from '@/views/manage/comment/components/CommonModal'
import CommonReplyModal from '@/views/manage/comment/components/CommonReplyModal'
export default {
  name: 'CommonPage',
  components: { CommonReplyModal, CommonModal },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less">
.common-page {
  width: 100%;
  height: 100%;
}
</style>
