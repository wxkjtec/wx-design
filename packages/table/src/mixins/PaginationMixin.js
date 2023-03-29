export const PaginationMixin = {
  computed: {
    paginationStyle({ paginationAlign }) {
      const ALIGNMAP = {
        left: "flex-start",
        center: "center",
        right: "flex-end",
      };
      return {
        display: "flex",
        justifyContent: ALIGNMAP[paginationAlign] || "right",
        marginTop: "6px",
      };
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("paginationChange", {
        ...this.pagination,
        [this.fetchSetting.pageField]: val,
      });
    },
    /**
     * 每页数量改变时，切回第一页
     */
    handleSizeChange(val) {
      this.$emit("paginationChange", {
        ...this.pagination,
        [this.fetchSetting.pageField]: 1,
        [this.fetchSetting.sizeField]: val,
      });
    },
  },
};
