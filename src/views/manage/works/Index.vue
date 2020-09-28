<template>
  <div class="works">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="全部">
        <div class="works-tab">
          <a-form>
            <div class="w-t-left">
              <a-form-item label="状态">
                <a-select v-model="status">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="0">已发布</a-select-option>
                  <a-select-option value="1">审核中</a-select-option>
                  <a-select-option value="2">未通过</a-select-option>
                  <a-select-option value="3">仅我可见</a-select-option>
                </a-select>
              </a-form-item>
            </div>
            <div class="w-t-right">
              <a-form-item>
                <a-range-picker format="YYYY-MM-DD" class="mr-24" @change="handleDate" />
              </a-form-item>
              <a-form-item>
                <a-input-search
                  placeholder="搜索关键词"
                  style="width: 150px"
                  @search="onSearch"
                />
              </a-form-item>
              <a-button type="primary" icon="search" @sclick="searchQuery">查询</a-button>
              <a-button type="primary" icon="reload" @click="searchReset">重置</a-button>
            </div>
          </a-form>
        </div>
        共 136 条内容
        <WorksModal />
      </a-tab-pane>
      <a-tab-pane key="2" tab="图文" force-render>
        图文
      </a-tab-pane>
      <a-tab-pane key="3" tab="视频">
        视频
      </a-tab-pane>
      <a-tab-pane key="4" tab="问答">
        问答
      </a-tab-pane>
      <a-tab-pane key="5">
        <span slot="tab">
          <a-divider type="vertical" />草稿箱
        </span>
        草稿箱
      </a-tab-pane>
    </a-tabs></div>
</template>

<script>
import WorksModal from '@/views/manage/works/components/WorksModal'
export default {
  name: 'Index',
  components: { WorksModal },
  data() {
    return {
      current: 2,
      status: '',
      beginDate: '',
      endDate: ''
    }
  },
  methods: {
    searchQuery(key) {
      console.log(key)
    },
    searchReset(key) {
      console.log(key)
    },
    callback(key) {
      console.log(key)
    },
    handleDate(e, date) {
      this.beginDate = date[0]
      this.endDate = date[1]
    },
    onChange(date, dateString) {
      console.log(date, dateString)
    },
    onSearch(value) {
      console.log(value)
    }
  }
}
</script>

<style scoped lang="less">
.works {
  width: 100%;
  .works-tab{
    /deep/ .ant-form{
        display: flex;
        .w-t-left{
          .ant-form-item-label{
            width: 48px;
            text-align: left;
          }
          .ant-form-item{
            display: flex;
            align-items: center;
          }
          .ant-select{
            max-width: 135px;
          }
        }
        .w-t-right{
          display: flex;
          flex-grow: 1;
          justify-content: flex-end;
          .ant-col{
            max-width: 240px;
            margin-left: 24px;
          }
          button{
            margin-left: 16px;
            margin-top: 4px;
          }
        }
      }
  }
}
</style>
