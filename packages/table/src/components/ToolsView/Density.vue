<template>
  <el-popover popper-class="popper-lh-class" placement="bottom" trigger="click">
    <div class="density-wrapper">
      <div
        :class="[
          'density-item',
          selected_density == item.size ? 'density-item-selected' : '',
        ]"
        v-for="item of getLineHeightSizes()"
        :key="item.size"
        @click="handleToggleDensity(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <el-tooltip effect="dark" content="密度" placement="top" slot="reference">
      <img :src="DENSITY_ICON" alt="" class="tool-icon" />
    </el-tooltip>
  </el-popover>
</template>
<script>
import DENSITY_ICON from "../../icon/density.png";
export default {
  name: "DensityTool",
  inject: ["getTableId", "getLocalTableSize", "getLineHeightSizes"],
  data() {
    return {
      DENSITY_ICON,
      selected_density: "",
      density: this.getLineHeightSizes(),
    };
  },
  methods: {
    handleToggleDensity({ size }) {
      this.selected_density = size;
      this.$emit("density-change", size);
      this.onDensityChange(size);
    },
    onDensityChange(size) {
      this.tableSize = size;
      this.$emit("onDensityChange", size);
    },
  },
  mounted() {
    this.selected_density =
      this.getLocalTableSize() || this.getLineHeightSizes()[0].size || 80;
  },
};
</script>
<style lang="less">
.popper-lh-class {
  padding: 0;
  min-width: 52px;
  .density-wrapper {
    width: 52px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .density-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 32px;
      color: #000000d9;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
      }
    }
    .density-item-selected {
      background-color: #e3f4fc;
      color: #0960bd;
    }
  }
}
</style>
