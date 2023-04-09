<template>
  <el-table-column
    align="center"
    v-bind="$attrs"
    v-if="typeof $attrs.show === 'boolean' ? $attrs.show : true"
  >
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
    <template v-for="(column, index) in $attrs.children">
      <table-column
        v-if="
          $attrs.children &&
          $attrs.children.length > 0 &&
          (typeof $attrs.show === 'boolean' ? $attrs.show : true)
        "
        v-bind="column"
      ></table-column>
    </template>
  </el-table-column>
</template>
<script>
import { RenderDom } from "./RenderDom";
export default {
  name: "TableColumn",
  components: {
    RenderDom,
  },
};
</script>
