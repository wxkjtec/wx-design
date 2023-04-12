import WxSelect from "./select";
import WxEcharts from "./echarts";
import WxDialog from "./dialog";
import WxTable from "./table";
import WxDate from "./datePicker";
import packageConfig from "../package.json";

const components = [WxSelect, WxEcharts, WxDialog, WxTable, WxDate];

const install = function (Vue) {
  if (install.installed) return;
  components.map((component) => Vue.component(component.name, component));
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { install, WxSelect, WxEcharts, WxDialog, WxTable, WxDate };

export default {
  install,
  WxSelect,
  WxEcharts,
  WxDialog,
  WxTable,
  WxDate,
  version: packageConfig.version,
};
