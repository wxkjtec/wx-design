// 表格拖拽列调整列宽
export const HeaderDragendMixin = {
  props: {
    isSaveTableSetting: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onHeaderDragend(newWidth, oldWidth, column, event) {
      if (this.tableId && this.isSaveTableSetting) {
        const updatedColumns = this.traverseColumn(
          this.tableColumn,
          column.property,
          newWidth
        );
        this.saveColumns(this.tableId, updatedColumns);
      }
    },
    traverseColumn(columns, prop, width) {
      columns.map((child) => {
        if (child.prop === prop) {
          child.width = width;
        }
        if (child.children && child.children.length > 0) {
          this.traverseColumn(child.children, prop, width);
        }
      });
      return columns;
    },
    saveColumns(tableId, columns) {
      localStorage.setItem(tableId, JSON.stringify(columns));
    },

    // 在加载table时，从本地中获取列宽配置
    setColumns() {
      const { tableId } = this;
      if (tableId) {
        const localColumns = localStorage.getItem(tableId);
        if (localColumns) {
          this.tableColumn = JSON.parse(localColumns);
        }
      }
    },
  },
  mounted() {
    this.setColumns();
  },
};
