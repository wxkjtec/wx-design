export const CommonMixin = {
  methods: {
    isRequireSave() {
      return this.tableId && this.isSaveTableSetting;
    },

    // columns  列配置数组
    // prop  列项中的prop，代表列的唯一属性
    // attr  需要修改列的属性key
    // attrValue 需要修改列的属性的值
    traverseColumn(columns, prop, attr, attrValue) {
      columns.map((child) => {
        if (child.prop === prop) {
          child[attr] = attrValue;
        }
        if (child.children && child.children.length > 0) {
          this.traverseColumn(child.children, prop, attr, attrValue);
        }
      });
      return columns;
    },

    // 保存Columns的配置
    saveColumns(columns) {
      localStorage.setItem(this.tableId, JSON.stringify(columns));
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
