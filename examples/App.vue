<template>
  <div id="app">
    <WxTable
      tableId="table1688"
      size="mini"
      background
      :pagination="pagination"
      :columns="columns"
      :data="tableData"
      :loading="tableLoading"
      border
      stripe
      :index="false"
      paginationAlign="right"
      :heightOffset="100"
      cellEmptyText="-"
      @paginationChange="onPaginationChange"
      @selection-change="selectionChange"
      @onRefreshTable="onRefreshTable"
      @onDensityChange="onDensityChange"
    >
      <div slot="title">基础表格</div>
      <div slot="toolbar">toolbar</div>
      <!-- <div slot="empty">0000</div> -->
    </WxTable>
    <!-- <WxDate
      type="daterange"
      v-model="date"
      :shortcuts="shotcuts"
      :startDate.sync="startDate"
      :endDate.sync="endDate"
    />
    <button @click="click">测试值</button> -->
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
          label: "yy",
          prop: "",
        },
        {
          label: "姓名",
          prop: "name",
          width: "200px",
        },
        {
          label: "头像",
          prop: "avatar",
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
        // {
        //   label: "yy1",
        //   prop: "",
        // },
        {
          label: "年龄",
          prop: "age",
          minWidth: "100px",
          sortable: true,
          show: true,
        },
        {
          label: "性别",
          prop: "gender",
        },
        {
          label: "邮箱",
          prop: "email",
          minWidth: "200px",
        },
        {
          label: "工作",
          prop: "job",
          show: true,
          minWidth: "100px",
        },
        {
          label: "身份证",
          prop: "visitorIdNum",
          width: "210px",
        },
        {
          label: "是否开车",
          prop: "",
        },
        {
          label: "访问次数",
          prop: "visitNum",
        },
        {
          label: "受访人员",
          prop: "intervieweeName",
        },
        // {
        //   label: '来访事由',
        //   prop: 'reason',
        //   // minWidth: '200px',
        // },
        {
          label: "操作",
          fixed: "right",
          width: "100px",
          isOperate: true,
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
