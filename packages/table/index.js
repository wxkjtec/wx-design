import Table from './src/Table.vue'

Table.install = (Vue, args) => {
  if (args) {
    const { defaultPageSize, fetchSetting } = args
    Table.props.defaultPageSize = {
      type: Number,
      default: defaultPageSize,
    }
    Table.props.fetchSetting = {
      type: Object,
      default: () => {
        return fetchSetting
      },
    }
  }
  Vue.component(Table.name, Table)
}

export default Table
