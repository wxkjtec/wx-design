<template>
  <div class="tools-view">
    <RefreshTool @refresh-table="$emit('refresh-table')" />
    <DensityTool @density-change="(val) => $emit('density-change', val)" />
    <SettingTool />
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
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.tools-view {
  height: 40px;
  padding-right: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 20px;
  gap: 15px;
  > span {
    font-size: 0;
  }
  /deep/.tool-icon {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
}
</style>
