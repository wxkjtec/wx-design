export const RequestMixin = {
  props: {
    // 是否在加载时执行 fetchData
    isInitialFetch: {
      type: Boolean,
      default: true,
    },
    // 请求参数
    queryParams: {
      type: Object,
      default: () => ({}),
    },
    // loading状态
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    fetchData(initial = true) {},
  },
  mounted() {
    if (this.isInitialFetch) this.fetchData();
  },
};
