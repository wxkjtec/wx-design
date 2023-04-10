<template>
  <div id="app">
    <!-- <WxTable
      tableId="table1688"
      size="mini"
      background
      :pagination="pagination"
      :columns="columns"
      :data="tableData"
      :loading="tableLoading"
      border
      stripe
      index
      paginationAlign="right"
      @paginationChange="onPaginationChange"
      @selection-change="selectionChange"
      @onRefreshTable="onRefreshTable"
      @onDensityChange="onDensityChange"
    >
      <div slot="title">基础表格</div>
    </WxTable> -->
    <WxDate
      type="daterange"
      v-model="date"
      :shortcuts="shotcuts"
      :startDate.sync="startDate"
      :endDate.sync="endDate"
    />
    <button @click="click">测试值</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
  data() {
    return {
      shotcuts: ["nextweek"],
      date: "",
      startDate: "",
      endDate: "",
      api: "",
      tableLoading: false,
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
      columns: [
        {
          label: "姓名",
          prop: "name",
          show: true,
        },
        {
          label: "头像",
          prop: "avatar",
          show: true,
          render: (h, { row }) => {
            return h("el-image", {
              props: {
                src: row.avatar,
                "preview-src-list": [row.avatar],
              },
              style: {
                width: "48px",
                height: "48px",
                borderRadius: "50%",
              },
            });
          },
        },
        {
          label: "年龄",
          prop: "age",
          minWidth: "100px",
          sortable: true,
          show: false,
        },
        {
          label: "性别",
          prop: "gender",
        },
        {
          label: "邮箱",
          prop: "email",
        },
        {
          label: "工作",
          prop: "job",
          show: true,
        },
      ],

      tableData: [],
    };
  },
  methods: {
    click() {
      console.log(this.date);
    },
    fetchData({ pageSize, pageNum }) {
      this.tableLoading = true;
      axios("/api/page", {
        method: "post",
        data: {
          pageSize: pageSize || 10,
          pageNum: pageNum || 1,
        },
      })
        .then((ret) => {
          const { records, total, pageNum, pageSize } = ret.data.data;
          this.tableData = records;
          this.pagination = {
            total,
            pageNum,
            pageSize,
          };
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    onPaginationChange({ pageSize, pageNum }) {
      this.fetchData({ pageSize, pageNum });
    },
    selectionChange(val) {
      console.log(val);
    },
    onRefreshTable() {
      this.fetchData({});
    },
    onDensityChange(size) {
      console.log(size);
    },
  },
  mounted() {
    this.fetchData({});
  },
};
</script>

<style>
html,
body {
  margin: 0;
}
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f0f2f5;
}
</style>
