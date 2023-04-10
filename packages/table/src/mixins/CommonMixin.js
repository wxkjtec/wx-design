import { cloneDeep } from "lodash-es";
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

    // 读取配置信息到当前columns  暂支持一级表头
    // newColumns  外部传入的column
    // localColumns  本地修改后的column
    getFilterConfigColumns(newColumns, localColumns) {
      if (!localColumns || localColumns.length === 0) {
        return newColumns;
      }
      let resultColumns = cloneDeep(localColumns);
      resultColumns = resultColumns.map((item) => {
        newColumns.forEach((column) => {
          if (column.label === item.label) {
            item = {
              ...column,
              width: item.width,
              show: typeof item.show === "boolean" ? item.show : true,
              fixed: item.fixed || undefined,
            };
          }
        });
        return item;
      });
      return resultColumns;
    },

    // 在加载table时，从本地中获取配置，同时再次更新本地配置（传入的可能有更新）
    setColumns() {
      const { tableId } = this;
      if (tableId) {
        // 读取本地存储的配置进行过滤
        this.tableColumn = this.getFilterConfigColumns(
          this.columns,
          this.getItem(tableId),
          false
        );
        this.saveColumns(this.tableColumn);
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
