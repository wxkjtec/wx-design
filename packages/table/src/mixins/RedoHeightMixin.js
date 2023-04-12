// 处理继承父元素高度
export const RedoHeightMixin = {
  methods: {
    calcTableHeight() {
      // 工具箱的高度
      let toolsHeight = 0;
      // 分页器的高度
      let paginationHeight = 0;
      if (this.hasToolsBox) {
        toolsHeight = this.getHeightBySelector(".wx-table-tools-view");
      }

      if (this.pagination) {
        paginationHeight = this.getHeightBySelector(".wx-table-pagination");
      }

      // 父元素高度
      const parentNodeHeight = this.$el.parentNode.offsetHeight;
      this.tableHeight = `${
        parentNodeHeight - toolsHeight - paginationHeight - this.heightOffset
      }px`;
      this.$refs["wx-table"].doLayout();
    },
    getHeightBySelector(selector) {
      return document.querySelector(selector).offsetHeight;
    },
  },
  mounted() {
    setTimeout(() => {
      this.isCanResizeParent && this.calcTableHeight();
    }, 0);
    window.addEventListener("resize", this.calcTableHeight, false);
  },
  beforeDestroy() {
    this.isCanResizeParent &&
      window.removeEventListener("resize", this.calcTableHeight, false);
  },
};
