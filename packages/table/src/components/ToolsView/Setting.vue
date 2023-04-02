<template>
  <el-popover
    popper-class="popper-setting-class"
    placement="bottom"
    trigger="click"
  >
    <div class="setting-wrapper">
      <div class="setting-title">
        <div class="operate">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >列展示</el-checkbox
          >
          <el-checkbox v-model="showIndex" @change="onIndexChange"
            >序号列</el-checkbox
          >
        </div>
        <div class="reset">
          <span>重置</span>
        </div>
      </div>
      <el-checkbox-group
        v-model="checkedItems"
        @change="handleCheckedItemsChange"
      >
        <Draggable
          class="setting-content"
          v-model="items"
          @change="onOrderChange"
        >
          <div class="items" v-for="(item, index) of items" :key="index">
            <img :src="MOVE_ICON" class="icon" />
            <el-checkbox
              v-model="item.show"
              class="checkbox"
              :label="item.label"
            ></el-checkbox>
          </div>
        </Draggable>
      </el-checkbox-group>
    </div>
    <el-tooltip effect="dark" content="列设置" placement="top" slot="reference">
      <img :src="SETTING_ICON" alt="" class="tool-icon" />
    </el-tooltip>
  </el-popover>
</template>
<script>
import Draggable from "vuedraggable";
import SETTING_ICON from "../../icon/setting.png";
import MOVE_ICON from "../../icon/move.png";
export default {
  name: "Setting",
  components: {
    Draggable,
  },
  inject: [
    "updateIndexShow",
    "updateTableColumn",
    "getLocalTableShowIndex",
    "getTableColumn",
    "getLocalTableColumns",
  ],
  data() {
    return {
      SETTING_ICON,
      MOVE_ICON,
      checkAll: false, // 是否勾选所有列
      showIndex: true, // 是否显示索引列

      isIndeterminate: true,

      checkedItems: [], // 已经勾选的项

      items: [],
    };
  },
  methods: {
    onIndexChange(val) {
      this.updateIndexShow(val);
    },
    toggleCheckAll(columns, isCheck) {
      columns.map((item) => {
        item.show = isCheck;
        if (item.children && item.children.length > 0) {
          this.toggleCheckAll(item.children, isCheck);
        }
      });
      return columns;
    },
    handleCheckAllChange(value) {
      console.log(value);
      this.items = this.toggleCheckAll(this.items, value);

      this.updateTableColumn(this.items);

      this.checkedItems = value ? this.items.map((item) => item.label) : [];
      this.isIndeterminate = false;
    },
    handleCheckedItemsChange(value, onlyChange = false) {
      console.log(onlyChange);
      const isCheckAll = value.length === this.items.length;
      if (isCheckAll) {
        this.checkAll = true;
        this.isIndeterminate = false;
      } else if (value.length !== 0) {
        this.checkAll = false;
        this.isIndeterminate = true;
      } else {
        this.isIndeterminate = false;
      }
      this.items = this.items.map((item) => {
        item.show = value.includes(item.label);
        return item;
      });
      !onlyChange && this.updateTableColumn(this.items);
    },
    onOrderChange(val) {
      this.updateTableColumn(this.items);
    },
  },
  mounted() {
    this.showIndex = this.getLocalTableShowIndex();
    this.items = this.getLocalTableColumns();
    this.checkedItems = this.items
      .filter((item) => item.show)
      .map((item) => item.label);
    this.handleCheckedItemsChange(this.checkedItems, true);
  },
};
</script>
<style lang="less" scoped>
.flip-list-move {
  transition: transform 0.3s ease-in;
}

.box {
  display: block;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.items {
  height: 34px;
  padding: 0 13px;
  display: flex;
  align-items: center;
  font-size: 0;
  .icon {
    width: 16px;
    height: 16px;
    cursor: move;
  }
  .checkbox {
    width: 16px;
    height: 16px;
    margin: 0 6px;
    position: relative;
    top: -1px;
  }
  .name {
    font-size: 14px;
  }
}

.items.active {
  background: rgba(0, 0, 0, 0.4);
}
</style>
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
      overflow: auto;
    }
  }
}
</style>
