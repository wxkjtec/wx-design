// 表格拖拽列调整列宽
export const HeaderDragendMixin = {
  methods: {
    onHeaderDragend(newWidth, oldWidth, column, event) {
      console.log(column)
      if (this.tableId && this.isSaveTableSetting) {
        const updatedColumns = this.traverseColumn(
          this.tableColumn,
          column.label,
          'width',
          newWidth
        )
        this.saveColumns(updatedColumns)
        this.$nickTick(() => {
          this.$refs['wx-table'].doLayout()
        })
      }
    },
  },
}
