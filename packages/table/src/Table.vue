<template>
  <div
    class="wx-table-container"
    v-loading="loading"
    :element-loading-text="loadingText"
    :element-loading-spinner="loadingIcon"
    :element-loading-background="loadingMaskColor"
  >
    <ToolsView
      v-if="hasToolsBox"
      @refresh-table="$emit('onRefreshTable')"
      @density-change="onDensityChange"
    >
      <template slot="tools-box-title">
        <slot name="title"> </slot>
      </template>
      <template slot="tool-bar">
        <slot name="toolbar" />
      </template>
    </ToolsView>
    <el-table
      class="wx-table"
      ref="wx-table"
      v-bind="$attrs"
      v-on="$listeners"
      :height="tableHeight"
      @header-dragend="onHeaderDragend"
      :row-style="{ height: rowHeight }"
    >
      <!-- 展开行 -->
      <template v-if="expand">
        <el-table-column type="expand" :resizable="false" align="center">
          <template slot-scope="props">
            <slot name="expand" :row="props" />
          </template>
        </el-table-column>
      </template>

      <!-- 选择框 -->
      <el-table-column
        align="center"
        v-if="selection"
        type="selection"
        :resizable="false"
        :width="selectionColWidth"
      />

      <!-- 索引 -->
      <el-table-column
        v-if="showIndex"
        type="index"
        :align="indexAlign"
        :resizable="false"
        :width="indexColWidth"
        :label="indexColLabel"
        fixed="left"
      ></el-table-column>

      <!-- 表格列 -->
      <TableColumn
        v-for="(item, index) of tableColumn"
        :key="index"
        v-bind="{
          align: 'center',
          ...item,
        }"
        :resizable="tableColumn.length - 1 !== index"
      />
    </el-table>

    <!-- 分页器 -->
    <div :style="paginationStyle" class="wx-table-pagination">
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
import ToolsView from "./components/ToolsView/index.vue";
import { PaginationMixin } from "./mixins/PaginationMixin";
import { HeaderDragendMixin } from "./mixins/HeaderDragendMixin";
import { CommonMixin } from "./mixins/CommonMixin";
import { RedoHeightMixin } from "./mixins/RedoHeightMixin";
import {
  TABLE_SIZE_SETTING_KEY,
  TABLE_INDEX_SETTING_KEY,
} from "./config/index";
export default {
  name: "WxTable",
  mixins: [CommonMixin, PaginationMixin, HeaderDragendMixin, RedoHeightMixin],
  components: {
    TableColumn,
    ToolsView,
  },
  provide() {
    return {
      getTableId: () => {
        return this.tableId;
      },
      getTableColumn: () => {
        return this.tableColumn;
      },
      getOriginalTableColum: () => {
        return this.columns;
      },
      getLineHeightSizes: () => this.lineHeightSizes,
      updateTableSize: this.updateTableSize,
      isRequireSave: this.isRequireSave,
      updateTableColumn: this.updateTableColumn,
      updateIndexShow: this.updateIndexShow,
      getLocalTableColumns: () => {
        return this.getItem(this.tableId) || this.columns;
      },
      getLocalTableSize: () => {
        return this.getItem(this.tableSizeKey);
      },
      getLocalTableShowIndex: () => {
        return this.getItem(this.tableShowIndexKey);
      },
      doLayout: () => {
        console.log(this.$refs);
        this.$refs["wx-table"].doLayout();
      },
    };
  },
  props: {
    // table唯一标识
    tableId: {
      type: String,
      default: "",
    },
    // 是否保存table设置
    isSaveTableSetting: {
      type: Boolean,
      default: true,
    },

    // 表格密度选项设置（行高）
    lineHeightSizes: {
      type: Array,
      default: () => [
        {
          label: "默认",
          size: "80px",
        },
        {
          label: "中等",
          size: "60px",
        },
        {
          label: "紧凑",
          size: "40px",
        },
      ],
    },

    // 继承父元素高度
    isCanResizeParent: {
      type: Boolean,
      default: true,
    },

    // loading状态
    loading: {
      type: Boolean,
      default: false,
    },
    // loading文本
    loadingText: {
      type: String,
      default: "加载中...",
    },
    // loading icon
    loadingIcon: {
      type: String,
      default: "el-icon-loading",
    },
    // loading 遮罩颜色
    loadingMaskColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.01)",
    },

    // 是否显示工具箱
    hasToolsBox: {
      type: Boolean,
      default: true,
    },

    // 是否可展开
    expand: {
      type: Boolean,
      default: false,
    },

    // 是否显示索引
    index: {
      type: Boolean,
      default: false,
    },
    // 索引列对齐方式
    indexAlign: {
      type: String,
      default: "center",
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

    // basic-table setting
    fetchSetting: {
      type: Object,
      default: () => ({
        pageField: "pageNum",
        sizeField: "pageSize",
        totalField: "total",
      }),
    },

    // Pagination
    pagination: Object,

    // Number of pages that can be selected.
    pageSizeOptions: {
      type: Array,
      default: () => [10, 20, 30, 40, 50, 100],
    },

    defaultPageSize: {
      type: Number,
      default: 10,
    },

    paginationLayout: {
      type: String,
      default: "total, sizes, prev, pager, next",
    },
    paginationAlign: {
      type: String,
      default: "right",
      validator(val) {
        return ["left", "center", "right"].includes(val);
      },
    },
  },
  data() {
    return {
      showIndex: true,
      tableColumn: [],
      tableHeight: ` `,
      rowHeight: this.lineHeightSizes[0].size,
    };
  },
  computed: {
    tableSizeKey({ tableId }) {
      return `${TABLE_SIZE_SETTING_KEY}-${tableId}`;
    },
    tableShowIndexKey({ tableId }) {
      return `${TABLE_INDEX_SETTING_KEY}-${tableId}`;
    },
  },
  watch: {
    columns: {
      handler(val) {
        this.tableColumn = val;
      },
      deep: true,
      // immediate: true,
    },
    index: {
      handler(val) {
        this.showIndex = val;
      },
      immediate: true,
    },
  },

  methods: {
    updateTableColumn(columns, updateLocalConfig) {
      this.tableColumn = this.getFilterConfigColumns(
        this.columns,
        columns,
        updateLocalConfig
      );
      if (this.isRequireSave()) {
        this.setItem(this.tableId, columns);
      }
    },
    updateIndexShow(show) {
      this.showIndex = show;
      if (this.isRequireSave()) {
        this.setItem(this.tableShowIndexKey, show);
      }
    },
    updateTableSize(size) {
      this.rowHeight = size;
      if (this.isRequireSave()) {
        this.setItem(this.tableSizeKey, size);
      }
    },
    onDensityChange(size) {
      this.rowHeight = size;
      if (this.isRequireSave()) {
        this.setItem(this.tableSizeKey, size);
      }
      this.$emit("onDensityChange", size);
    },
    setTableSetting() {
      if (this.isRequireSave()) {
        const localTableSize = this.getItem(this.tableSizeKey);
        const localTableShowIndex = this.getItem(this.tableShowIndexKey);
        localTableSize && (this.rowHeight = localTableSize);
        this.showIndex = localTableShowIndex;
      }
    },
  },
  mounted() {
    this.setTableSetting();
  },
};
</script>

<style lang="less" scoped>
.wx-table-container {
  background: #fff;
}
</style>
