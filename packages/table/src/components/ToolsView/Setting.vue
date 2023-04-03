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
          <span @click="handleReset">重置</span>
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
            <!-- 移动列和勾选列 -->
            <div class="left">
              <img :src="MOVE_ICON" class="icon" />
              <el-checkbox
                v-model="item.show"
                class="checkbox"
                :label="item.label"
              ></el-checkbox>
            </div>
            <!-- 冻结列 -->
            <div class="right">
              <img
                class="arrow-icon"
                :src="item.fixed === 'left' ? ARROW_LEFT_ACTIVE : ARROW_LEFT"
                alt=""
                @click="handleFixedColChange(item, 'left')"
              />
              <img
                class="arrow-icon"
                :src="item.fixed === 'right' ? ARROW_RIGHT_ACTIVE : ARROW_RIGHT"
                alt=""
                @click="handleFixedColChange(item, 'right')"
              />
            </div>
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
import ARROW_LEFT from "../../icon/arrow-left.png";
import ARROW_LEFT_ACTIVE from "../../icon/arrow-left-active.png";
import ARROW_RIGHT from "../../icon/arrow-right.png";
import ARROW_RIGHT_ACTIVE from "../../icon/arrow-right-active.png";
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
    "getOriginalTableColum",
  ],
  data() {
    return {
      SETTING_ICON,
      MOVE_ICON,

      ARROW_LEFT,
      ARROW_LEFT_ACTIVE,
      ARROW_RIGHT,
      ARROW_RIGHT_ACTIVE,

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
      this.items = this.toggleCheckAll(this.items, value);

      this.updateTableColumn(this.items);

      this.checkedItems = value ? this.items.map((item) => item.label) : [];
      this.isIndeterminate = false;
    },
    handleCheckedItemsChange(value, onlyChange = false) {
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

    handleFixedColChange({ prop }, arrow) {
      this.items = this.items.map((item) => {
        if (item.prop === prop) {
          item.fixed = item.fixed === arrow ? false : arrow;
        }
        return item;
      });
      this.updateTableColumn(this.items);
    },
    // 重置table columns
    handleReset() {
      this.items = this.getOriginalTableColum();
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
  justify-content: space-between;
  align-items: center;
  font-size: 0;
  .left,
  .right {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .left {
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
  .right {
    font-size: 14px;
    .arrow-icon {
      width: 16px;
      height: 16px;
      cursor: pointer;
      &:last-child {
        margin-left: 10px;
      }
    }
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
