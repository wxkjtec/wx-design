<template>
  <div class="wx-table-tools-view">
    <div class="title">
      <slot name="tools-box-title" />
    </div>
    <div class="tools-box">
      <RefreshTool @refresh-table="$emit('refresh-table')" />
      <DensityTool @density-change="(val) => $emit('density-change', val)" />
      <SettingTool />
    </div>
  </div>
</template>
<script>
import RefreshTool from "./Refresh.vue";
import DensityTool from "./Density.vue";
import SettingTool from "./Setting.vue";
export default {
  name: "ToolsView",
  components: {
    RefreshTool,
    DensityTool,
    SettingTool,
  },
};
</script>
<style lang="less" scoped>
.wx-table-tools-view {
  height: 40px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  .title {
    font-size: 14px;
    color: #000;
  }
  .tools-box {
    display: flex;
    gap: 12px;
    > span {
      font-size: 0;
    }
    /deep/.tool-icon {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }
}
</style>
