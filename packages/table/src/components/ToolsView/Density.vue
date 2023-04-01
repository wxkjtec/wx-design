<template>
  <el-popover popper-class="popper-lh-class" placement="bottom" trigger="click">
    <div class="density-wrapper">
      <div
        :class="[
          'density-item',
          selected_density === item.size ? 'density-item-selected' : '',
        ]"
        v-for="item of density"
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
import { TABLE_SIZE_SETTING_KEY } from "../../config/index";
export default {
  name: "DensityTool",
  inject: ["getTableId", "updateTableSize", "isRequireSave"],
  data() {
    return {
      DENSITY_ICON,
      selected_density: "medium",
      density: [
        {
          size: "medium",
          label: "默认",
        },
        {
          size: "small",
          label: "中等",
        },
        {
          size: "mini",
          label: "紧凑",
        },
      ],
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
      if (this.isRequireSave()) {
        localStorage.setItem(
          `${TABLE_SIZE_SETTING_KEY}-${this.getTableId()}`,
          size
        );
      }
      this.$emit("onDensityChange", size);
    },
  },
  mounted() {
    this.selected_density =
      localStorage.getItem(`${TABLE_SIZE_SETTING_KEY}-${this.getTableId()}`) ||
      "medium";
  },
};
</script>
<style lang="less" scoped></style>
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
