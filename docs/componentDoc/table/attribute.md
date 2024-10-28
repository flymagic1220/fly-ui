# FTable 参数配置

<style>
    .theme-default-content:not(.custom){
        max-width:1180px!important
    }
</style>

| 名称           | 说明                                                  | 类型     | 默认值 |
| -------------- | ----------------------------------------------------- | -------- | ------ |
| tableData      | 表格数据                                              | Array    | []     |
| tableColumns   | 表格列配置项                                          | Object   | {}     |
| ——prop         | 列属性                                                | String   | -      |
| ——label        | 列名                                                  | String   | -      |
| ——width        | 列宽                                                  | String   | -      |
| ——minWidth     | 最小列宽                                              | String   | -      |
| ——canEdit      | 是否显示可编辑单元格                                  | Boolean  | -      |
| ——isClickEdit  | 是否点击显示可编辑单元格                              | Boolean  | -      |
| ——filterFn     | 列过滤方法                                            | Function | -      |
| ——children     | 多表头子列                                            | Array    | -      |
| ——bind         | 第三方组件库属性                                      | Object   | -      |
| ——editConfig   | 编辑项配置                                            | Object   | -      |
| ————editComp   | 动态组件                                              | String   | -      |
| ————type       | 组件类型                                              | String   | -      |
| ————rules      | 校验规则                                              | Array    | []     |
| ———— list      | 下拉菜单、复选框组、单选框组的数据                    | Array    | -      |
| ———— listLabel | list 的 label 对应的字段 code                         | String   | label  |
| ———— listValue | list 的 value 对应的字段 code                         | String   | value  |
| ———— bind      | 第三方组件绑定的属性                                  | Object   | -      |
| tableConfig    | 表格配置项                                            | Object   | {}     |
| ——firstColumn  | 第一列序号、复选框、单选框的配置,单独设置方便后续扩展 | Array    | -      |
| ——listTypeInfo | 可编辑表格的下拉框、复选框组、单选框组的选项配置      | Object   | -      |
