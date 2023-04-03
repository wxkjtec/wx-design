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
      this.setItem(this.tableId, columns);
    },

    // 在加载table时，从本地中获取配置
    setColumns() {
      const { tableId } = this;
      if (tableId) {
        this.tableColumn = this.getItem(tableId) || this.columns;
      }
    },

    // setItem存储
    setItem(key, value) {
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    },

    // getItem取值
    getItem(key) {
      const data = localStorage.getItem(key);
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    },
  },
  mounted() {
    this.setColumns();
  },
};
