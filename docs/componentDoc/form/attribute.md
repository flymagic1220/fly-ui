# FForm 参数配置

<style>
    .theme-default-content:not(.custom){
        max-width:1180px!important
    }
</style>

| 名称             | 说明                               | 类型     | 默认值  |
| ---------------- | ---------------------------------- | -------- | ------- |
| data             | 表单数据项                         | Object   | {}      |
| rules            | 表单校验规则                       | Object   | {}      |
| formSpan         | 表单布局(一行占几列)               | String   | 1       |
| formOpt          | 表单配置项                         | Object   | {}      |
| ——labelPosition  | label 位置                         | String   | right   |
| ——labelWidth     | label 宽度                         | String   | '120px' |
| ——btnSlotName    | 自定义操作按钮插槽                 | String   | -       |
| ——operatorList   | 操作按钮                           | Array    | -       |
| ——listTypeInfo   | options 选项                       | Object   | -       |
| ——filedList      | formItem 配置项                    | Object   | {}      |
| ————label        | 标签                               | String   | -       |
| ————prop         | 属性                               | String   | -       |
| ————type         | 组件类型                           | String   | -       |
| ————comp         | 动态组件                           | String   | -       |
| ————width        | 表单宽度                           | String   | 100%    |
| ————placeHolder  | 提示信息                           | String   | -       |
| ————rules        | 校验规则                           | Array    | []      |
| ————slotName     | 自定义插槽的名字                   | String   | -       |
| ————labelRender  | 是否自定义 label                   | String   | -       |
| ———— renderFun   | 自定义 label 的渲染函数            | Function | -       |
| ———— list        | 下拉菜单、复选框组、单选框组的数据 | Array    | -       |
| ———— listLabel   | list 的 label 对应的字段 code      | String   | label   |
| ———— listValue   | list 的 value 对应的字段 code      | String   | value   |
| ———— eventHandle | 事件绑定                           | Object   | -       |
| ———— bind        | 第三方组件绑定的属性               | Object   | -       |
