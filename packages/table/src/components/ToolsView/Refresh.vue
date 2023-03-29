<template>
  <el-tooltip effect="dark" content="刷新" placement="top">
    <img :src="REFRESH_ICON" alt="" class="tool-icon" @click="handleRefresh" />
  </el-tooltip>
</template>
<script>
import REFRESH_ICON from "../../icon/refresh.png";
export default {
  name: "Refresh",
  data() {
    return {
      REFRESH_ICON,
    };
  },
  methods: {
    handleRefresh() {
      this.$emit("refresh-table");
    },
  },
};
</script>
<style lang="less" scoped></style>
