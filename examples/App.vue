<template>
  <div id="app">
    <WxTable
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
    >
      <p slot="expand" slot-scope="scope">
        <span>{{ scope.row.row.name }}</span>
      </p>
    </WxTable>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      api: '',
      tableLoading: false,
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
      columns: [
        {
          label: '姓名',
          prop: 'name',
        },
        {
          label: '年龄',
          prop: 'age',
          minWidth: '100px',
          sortable: true,
        },
        {
          label: '性别',
          prop: 'gender',
        },
        {
          label: '邮箱',
          prop: 'email',
        },
      ],

      tableData: [],
    }
  },
  methods: {
    console(val) {
      console.log(val)
    },
    fetchData({ pageSize, pageNum }) {
      this.tableLoading = true
      axios('/api/page', {
        method: 'post',
        data: {
          pageSize: pageSize || 10,
          pageNum: pageNum || 1,
        },
      })
        .then((ret) => {
          const { records, total, pageNum, pageSize } = ret.data.data
          this.tableData = records
          this.pagination = {
            total,
            pageNum,
            pageSize,
          }
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    onPaginationChange({ pageSize, pageNum }) {
      this.fetchData({ pageSize, pageNum })
    },
    selectionChange(val) {
      console.log(val)
    },
  },
  mounted() {
    this.fetchData({})
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
