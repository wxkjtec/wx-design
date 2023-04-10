import DatePicker from "./src/DatePicker.vue";

DatePicker.install = (Vue) => {
  Vue.component(DatePicker.name, DatePicker);
};

export default DatePicker;
