<template>
  <div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="全部">
        <CommentList />
      </a-tab-pane>
      <a-tab-pane key="2" tab="图文" force-render>
        <GraphicList type="0" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="视频">
        <GraphicList type="1" />
      </a-tab-pane>
      <a-tab-pane key="4" tab="问答">
        <AskCommentList type="2" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import GraphicList from '@/views/manage/comment/components/GraphicList'
import CommentList from '@/views/manage/comment/components/CommentList'
import AskCommentList from '@/views/manage/comment/components/AskCommentList'
export default {
  name: 'Index',
  components: { AskCommentList, CommentList, GraphicList },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped></style>
