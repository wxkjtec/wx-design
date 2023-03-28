export const PaginationMixin = {
  props: {
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
      default: 'total, sizes, prev, pager, next',
    },
    paginationAlign: {
      type: String,
      default: 'right',
      validator(val) {
        return ['left', 'center', 'right'].includes(val)
      },
    },
  },
  computed: {
    paginationStyle({ paginationAlign }) {
      const ALIGNMAP = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
      }
      return {
        display: 'flex',
        justifyContent: ALIGNMAP[paginationAlign] || 'right',
      }
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('paginationChange', {
        ...this.pagination,
        [this.fetchSetting.pageField]: val,
      })
    },
    /**
     * 每页数量改变时，切回第一页
     */
    handleSizeChange(val) {
      this.$emit('paginationChange', {
        ...this.pagination,
        [this.fetchSetting.pageField]: 1,
        [this.fetchSetting.sizeField]: val,
      })
    },
  },
}
