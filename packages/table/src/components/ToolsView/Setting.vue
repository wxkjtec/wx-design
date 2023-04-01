<template>
  <el-popover
    popper-class="popper-setting-class"
    placement="bottom"
    trigger="click"
  >
    <div class="setting-wrapper">
      <div class="setting-title">
        <div class="operate">
          <el-checkbox :indeterminate="indeterminate" v-model="colShow"
            >列展示</el-checkbox
          >
          <el-checkbox v-model="indexShow" @change="onIndexChange"
            >序号列</el-checkbox
          >
        </div>
        <div class="reset">
          <span>重置</span>
        </div>
      </div>
      <div class="setting-content"></div>
    </div>
    <el-tooltip effect="dark" content="列设置" placement="top" slot="reference">
      <img :src="SETTING_ICON" alt="" class="tool-icon" />
    </el-tooltip>
  </el-popover>
</template>
<script>
import SETTING_ICON from "../../icon/setting.png";
export default {
  name: "Setting",
  data() {
    return {
      SETTING_ICON,
      colShow: false,
      indexShow: false,

      indeterminate: true,
    };
  },
  methods: {
    onIndexChange(val) {
      console.log(val);
    },
  },
};
</script>
<style lang="less" scoped></style>
<style lang="less">
.popper-setting-class {
  width: 314px;
  padding: 0;
  .setting-wrapper {
    .setting-title {
      height: 34px;
      padding: 0 16px;
      box-sizing: border-box;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .reset {
        color: #409eff;
        cursor: pointer;
      }
    }
    .setting-content {
      height: 200px;
      max-height: 300px;
    }
  }
}
</style>
