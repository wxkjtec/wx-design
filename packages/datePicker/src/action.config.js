import dayjs from "dayjs";
export const enumeration = [
  {
    value: "today",
    date: {
      text: "今天",
      onClick(picker) {
        picker.$emit("pick", dayjs().format("YYYY-MM-DD"));
      },
    },
  },
  {
    value: "yesterday",
    date: {
      text: "昨天",
      onClick(picker) {
        picker.$emit("pick", dayjs().subtract(1, "day").format("YYYY-MM-DD"));
      },
    },
  },
  {
    value: "tomorrow",
    date: {
      text: "明天",
      onClick(picker) {
        picker.$emit("pick", dayjs().add(1, "day").format("YYYY-MM-DD"));
      },
    },
  },
  {
    value: "lastweek",
    date: {
      text: "上周",
      onClick(picker) {
        picker.$emit("pick", dayjs().subtract(7, "day").format("YYYY-MM-DD"));
      },
    },
    range: {
      text: "上周",
      onClick(picker) {
        const end = dayjs().format("YYYY-MM-DD");
        const start = dayjs().subtract(7, "day").format("YYYY-MM-DD");
        picker.$emit("pick", [start, end]);
      },
    },
  },
  {
    value: "nextweek",
    date: {
      text: "下周",
      onClick(picker) {
        picker.$emit("pick", dayjs().add(7, "day").format("YYYY-MM-DD"));
      },
    },
    range: {
      text: "下周",
      onClick(picker) {
        const start = dayjs().format("YYYY-MM-DD");
        const end = dayjs().add(7, "day").format("YYYY-MM-DD");
        picker.$emit("pick", [start, end]);
      },
    },
  },
  {
    value: "lastmonth",
    date: {
      text: "上个月",
      onClick(picker) {
        picker.$emit("pick", dayjs().subtract(1, "month").format("YYYY-MM-DD"));
      },
    },
    range: {
      text: "上个月",
      onClick(picker) {
        const end = dayjs().format("YYYY-MM-DD");
        const start = dayjs().subtract(1, "month").format("YYYY-MM-DD");
        picker.$emit("pick", [start, end]);
      },
    },
  },
  {
    value: "nextmonth",
    date: {
      text: "下个月",
      onClick(picker) {
        picker.$emit("pick", dayjs().add(1, "month").format("YYYY-MM-DD"));
      },
    },
    range: {
      text: "下个月",
      onClick(picker) {
        const start = dayjs().format("YYYY-MM-DD");
        const end = dayjs().add(1, "month").format("YYYY-MM-DD");
        picker.$emit("pick", [start, end]);
      },
    },
  },
  {
    value: "quarter",
    range: {
      text: "最近三个月",
      onClick(picker) {
        const end = dayjs().format("YYYY-MM-DD");
        const start = dayjs().subtract(3, "month").format("YYYY-MM-DD");
        picker.$emit("pick", [start, end]);
      },
    },
  },
  {
    value: "halfyear",
    range: {
      text: "最近半年",
      onClick(picker) {
        const end = dayjs().format("YYYY-MM-DD");
        const start = dayjs().subtract(6, "year").format("YYYY-MM-DD");
        picker.$emit("pick", [start, end]);
      },
    },
  },
  {
    value: "lastyear",
    date: {
      text: "上一年",
      onClick(picker) {
        picker.$emit("pick", dayjs().subtract(1, "year").format("YYYY-MM-DD"));
      },
    },
    range: {
      text: "上一年",
      onClick(picker) {
        const end = dayjs().format("YYYY-MM-DD");
        const start = dayjs().subtract(1, "year").format("YYYY-MM-DD");
        picker.$emit("pick", [start, end]);
      },
    },
  },
  {
    value: "nextyear",
    date: {
      text: "下一年",
      onClick(picker) {
        picker.$emit("pick", dayjs().add(1, "year").format("YYYY-MM-DD"));
      },
    },
    range: {
      text: "下一年",
      onClick(picker) {
        const start = dayjs().format("YYYY-MM-DD");
        const end = dayjs().add(1, "year").format("YYYY-MM-DD");
        picker.$emit("pick", [start, end]);
      },
    },
  },
];
// 单选日期
export function dateShortcuts(shortcuts) {
  const arr = [];
  enumeration.forEach((val) => {
    shortcuts.forEach((item) => {
      if (item === val.value && val.date) {
        arr.push(val.date);
      }
    });
  });
  return arr;
}
// 日期区间
export function daterangeSortcuts(shortcuts) {
  const arr = [];
  enumeration.forEach((val) => {
    shortcuts.forEach((item) => {
      if (item === val.value && val.range) {
        arr.push(val.range);
      }
    });
  });
  return arr;
}

export default { enumeration, dateShortcuts, daterangeSortcuts };
