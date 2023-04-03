<template>
  <div id="app">
    <WxTable
      tableId="table1688"
      max-height="500px"
      size="mini"
      background
      :pagination="pagination"
      :columns="columns"
      :data="tableData"
      :loading="tableLoading"
      border
      stripe
      expand
      index
      paginationAlign="center"
      @paginationChange="onPaginationChange"
      @selection-change="selectionChange"
      @onRefreshTable="onRefreshTable"
      @onDensityChange="onDensityChange"
    >
      <div slot="expand" slot-scope="scope">
        <span>{{ scope.row.row.name }}</span>
      </div>
    </WxTable>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
  data() {
    return {
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
          align: "left",
          show: true,
          fixed: "left",
        },
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
          show: true,
        },
        {
          label: "邮箱",
          prop: "email",
          show: true,
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
