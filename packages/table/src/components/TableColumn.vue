<template>
  <el-table-column align="center" v-bind="$attrs">
    <!-- 自定义单元格内容 -->
    <template v-if="$attrs.render" v-slot="scope">
      <render-dom
        :render="$attrs.render"
        :row="scope.row"
        :index="scope.$index"
        :column="$attrs"
      ></render-dom>
    </template>

    <!-- 递归children 支持多级表头和合并单元格-->
    <template v-if="$attrs.children && $attrs.children.length > 0">
      <table-column
        v-for="(column, index) in $attrs.children"
        :key="index"
        v-bind="column"
      ></table-column>
    </template>
  </el-table-column>
</template>
<script>
import { RenderDom } from './RenderDom'
export default {
  name: 'TableColumn',
  components: {
    RenderDom,
  },
}
</script>
