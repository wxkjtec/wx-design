<template>
  <div>
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      @header-dragend="onHeaderDragend"
      v-loading="loading"
    >
      <!-- 展开行 -->
      <template v-if="expand">
        <el-table-column type="expand" :resizable="false">
          <template slot-scope="props">
            <slot name="expand" :row="props" />
          </template>
        </el-table-column>
      </template>

      <!-- 选择框 -->
      <el-table-column
        v-if="selection"
        type="selection"
        :resizable="false"
        :width="selectionColWidth"
      />

      <!-- 索引 -->
      <el-table-column
        v-if="index"
        type="index"
        :resizable="false"
        :width="indexColWidth"
        :label="indexColLabel"
      ></el-table-column>

      <!-- 表格列 -->
      <TableColumn
        v-for="(item, index) of tableColumn"
        :key="index"
        v-bind="item"
        resizable
      />
    </el-table>

    <!-- 分页器 -->
    <div :style="paginationStyle">
      <el-pagination
        v-if="pagination"
        v-bind="$attrs"
        :total="pagination[fetchSetting.totalField]"
        :current-page="pagination[fetchSetting.pageField]"
        :page-size="pagination[fetchSetting.sizeField] || defaultSize"
        :layout="paginationLayout"
        :page-sizes="pageSizeOptions"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import TableColumn from "./components/TableColumn.vue";
import { PaginationMixin } from "./mixins/PaginationMixin";
import { HeaderDragendMixin } from "./mixins/HeaderDragendMixin";
export default {
  name: "WxTable",
  mixins: [PaginationMixin, HeaderDragendMixin],
  components: {
    TableColumn,
  },
  props: {
    // table唯一标识
    tableId: {
      type: String,
      default: "",
    },

    // 是否可展开
    expand: {
      type: Boolean,
      default: false,
    },

    // 是否显示索引
    index: {
      type: Boolean,
      default: true,
    },
    // 索引列名称
    indexColLabel: {
      type: String,
      default: "序号",
    },
    // 索引列宽
    indexColWidth: {
      type: Number,
      default: 82,
    },

    // 是否显示选择框
    selection: {
      type: Boolean,
      default: false,
    },
    // 选择框列宽
    selectionColWidth: {
      type: Number,
      default: 82,
    },

    // table loading状态
    loading: {
      type: Boolean,
      default: false,
    },

    // table column
    columns: {
      type: Array,
      default: () => [],
    },

    // table size
    defaultSize: {
      type: String,
      default: "middle",
    },
  },
  data() {
    return {
      tableColumn: [],
    };
  },
  watch: {
    columns: {
      handler(val) {
        this.tableColumn = val;
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {},
};
</script>

<style lang="less" scoped></style>
