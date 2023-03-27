<template>
  <div>
    <el-table v-bind="$attrs" v-on="$listeners"> 
      <el-table-column v-if="index" type="index" :width="indexColWidth" :label="indexColLabel"></el-table-column>
      <el-table-column v-for="(item, index) of tableColumn" :key="index" v-bind="item">
        <template v-if="item.render" v-slot="scope">
          <render-dom :render="() => item.render(scope.row)"></render-dom>
        </template>
      </el-table-column>
    </el-table-column>
    </el-table>
    <el-pagination
      v-if="pagination"
      :total="pagination.total"
      :current-page="pagination.pageNum"
      :page-size="pagination.pageSize"
      @current-change=""
      layout="total, sizes, prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import { RenderDom } from './components/RenderDom'
import { PaginationMixin } from './mixins/PaginationMixin'
export default {
  name: 'WxTable',
  mixins: [PaginationMixin],
  props: {
    // Index
    index: {
      type: Boolean,
      default: true
    },
    indexColLabel: {
      type: String,
      default: '序号'
    },
    indexColWidth: {
      type: Number,
      default: 82
    },

    // Table
    tableColumn: {
      type: Array,
      default: () => []
    },

    // basic-table setting
    fetchSetting: {
      type: Object,
      default: () => ({
        pageField: 'pageNum',
        sizeField: 'pageSize',
        listField: 'records',
        totalField: 'total'
      })
    },
    // Number of pages that can be selected.
    pageSizeOptions: [10, 20, 30, 40, 50, 100],

    defaultPageSize: 10,

    defaultSize: 'middle',

    // Pagination
    pagination: Object,
  },
  components: {
    RenderDom
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped></style>
