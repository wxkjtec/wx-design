<template>
  <el-date-picker
    v-bind="$attrs"
    v-on="$listeners"
    v-model="value"
    :type="type"
    :placeholder="placeholder"
    :range-separator="rangeSeparator"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :picker-options="pickerOptions"
    :value-format="valueFormat"
    @change="onChange"
  >
  </el-date-picker>
</template>
<script>
import { enumeration, dateShortcuts, daterangeSortcuts } from "./action.config";
export default {
  name: "WxDate",
  components: {},
  model: {
    event: "change",
    prop: "modelValue",
  },
  props: {
    modelValue: {
      type: [String, Array],
      default: "",
    },
    // 选择日期还是日期区间
    type: {
      type: String,
      default: "date",
    },
    placeholder: {
      type: String,
      default: "请选择日期",
    },
    rangeSeparator: {
      type: String,
      default: "至",
    },
    startPlaceholder: {
      type: String,
      default: "开始日期",
    },
    endPlaceholder: {
      type: String,
      default: "结束日期",
    },
    valueFormat: {
      type: String,
      default: "yyyy-MM-dd",
    },
    disabledDate: {
      type: String,
      default: "",
    },
    shortcuts: {
      type: Array,
      default: () => [],
      validator(val) {
        if (val && val.length > 0) {
          return enumeration.some((item) => val.includes(item.value));
        }
        return true;
      },
    },
  },
  data() {
    return {
      value: "",
    };
  },
  watch: {
    type: {
      handler(v) {
        // 判断一下
        // 如果是date则默认值用v-model
        // 如果是daterange默认值则用startDate和endDate
        let value;
        if (v === "date") {
          value = this.modelValue;
        } else if (v === "daterange") {
          const { startDate, endDate } = this.$attrs;
          if (startDate && endDate) {
            value = [startDate, endDate];
          } else {
            value = [];
          }
        }
        this.value = value;
      },
      immediate: true,
    },
  },
  computed: {
    pickerOptions(data) {
      const { $attrs, disabledDate, type } = data;
      // 如果有值直接用传过来的设置
      // 如果没有 则用默认的设置
      if ($attrs.pickerOptions) {
        return $attrs.pickerOptions;
      } else {
        const options = {};
        // disabledDate
        // 如果是after则是禁用今天之后的日期
        // 如果是before则是禁用今天之前的日期
        if (disabledDate === "after") {
          options.disabledDate = function (time) {
            return time.getTime() > Date.now();
          };
        } else if (disabledDate === "before") {
          options.disabledDate = function (time) {
            return time.getTime() < Date.now() - 3600 * 1000 * 24;
          };
        }
        if (type === "date") {
          options.shortcuts = dateShortcuts(this.shortcuts);
        } else if (type === "daterange") {
          options.shortcuts = daterangeSortcuts(this.shortcuts);
        }
        // 如果长度为0则代表没有快捷选项
        if (options.shortcuts && options.shortcuts.length === 0) {
          delete options.shortcuts;
        }
        return options;
      }
    },
  },
  methods: {
    onChange(value) {
      // 判断是选单个日期还是日期区间
      if (this.type === "date") {
        this.$emit("change", value);
      } else if (this.type.indexOf("range") !== -1) {
        // 如果有值则取第一个和第二个，如果没值默认传空字符串
        if (value) {
          this.$emit("update:startDate", value[0]);
          this.$emit("update:endDate", value[1]);
        } else {
          this.$emit("update:startDate", null);
          this.$emit("update:endDate", null);
        }
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped></style>
