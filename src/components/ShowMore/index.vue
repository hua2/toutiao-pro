<template>
  <div class="wrapper-container">
    <!-- overflow: hidden：清除子元素相对父元素的超界溢出 -->
    <div
      style="overflow: hidden"
      :style="{
        height: showMore ? 'auto' : showHeight + 'px',
        paddingBottom: showMore ? '44px' : '0'
      }"
    >
      <div ref="content">
        <slot>
          <!-- 当外界 <show-more> 标签中有元素时，使用 <show-more> 标签中的元素进行渲染，否则使用下面这个 div 进行渲染 -->
          <div v-html="content"></div>
        </slot>
      </div>
    </div>

    <div
      v-show="isLongContent"
      class="control"
      :class="{ 'show-more': showMore }"
    >
      <a href="javascript:" class="text-14" @click="_toggleShowMore">{{
        showMore ? "折叠" : "展开回答"
      }}</a>
    </div>
  </div>
</template>

<script>
/**
 *角马工厂-查看更多模块
 * @author lyh
 * @date 2019-08-19
 */
export default {
  name: 'ShowMore',
  props: {
    showHeight: {
      type: Number,
      required: true,
      default: 200
    },
    content: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      showMore: false,
      isLongContent: false
    }
  },
  watch: {
    // 每当内容变化时都重新计算一次高度
    content() {
      this.refresh()
    }
  },
  updated() {
    this.refresh()
  },
  methods: {
    _toggleShowMore() {
      this.showMore = !this.showMore
    },
    refresh() {
      this._calculateHeight()
    },
    _calculateHeight() {
      // $nextTick()，等待内容获取完毕再计算高度，异步处理
      this.$nextTick().then(() => {
        const contentHeight = this.$refs.content.clientHeight
        this.isLongContent = contentHeight > this.showHeight
      })
    }
  }
}
</script>
<style scoped lang="less">
.wrapper-container {
  position: relative;

  .control {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-top: 48px;
    text-align: center;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(255, 255, 255, 0.95) 53%,
      rgba(255, 255, 255, 1) 100%
    );
    a {
      color: #1356bd;
      text-decoration: underline;
    }
    &.show-more {
      padding-top: 0;
      background: none;
    }
  }
}
</style>
