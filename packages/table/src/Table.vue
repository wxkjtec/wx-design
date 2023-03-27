<template>
  <div>
    <el-table v-bind="$attrs" v-on="$listeners"> 
      <el-table-column v-if="index" type="index" :width="indexColWidth" :label="indexColLabel"></el-table-column>
      <el-table-column v-for="(item, index) of tableColumn" :key="index" v-bind="item" resizable >
        <template v-if="item.render" v-slot="scope">
          <render-dom :render="item.render" :row="scope.row" :index="scope.$index" :column="item"></render-dom>
        </template>
      </el-table-column>
    </el-table-column>
    </el-table>
    <el-pagination
      v-if="pagination"
      :total="pagination.total"
      :current-page="pagination.pageNum"
      :page-size="pagination.pageSize"
      :layout="paginationLayout"
      :page-sizes="pageSizeOptions"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import { RenderDom } from './components/RenderDom'
import { PaginationMixin } from './mixins/PaginationMixin'
export default {
  name: 'WxTable',
  mixins: [PaginationMixin],
  components: {
    RenderDom
  },
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
    defaultSize: {
      type: String,
      default: 'middle'
    },

    // Pagination
    pagination: Object,

    // Number of pages that can be selected.
    pageSizeOptions: [10, 20, 30, 40, 50, 100],

    defaultPageSize: 10,

    paginationLayout: {
      type: String,
      default: "total, sizes, prev, pager, next",
    },

  },
  data() {
    return {}
  },
  methods: {
    handleCurrentChange() {},
    handleSizeChange(){}
  }
}
</script>

<style lang="less" scoped></style>
