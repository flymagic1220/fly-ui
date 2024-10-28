# 多级表头

## 效果

<el-card class="box-card">
  <f-table :tableData="tableData" :tableColumns="tableColumns" :tableConfig="tableConfig" ref="FTable"> </f-table>
</el-card>

<script lang="js">
  export default{
    data(){
      return {
        tableData:[
            {
                id: '1',
                type: '入库',
                date: '2019-09-25',
                date1: '2019-09-25',
                name: '张三',
                status: '2',
                address: '广东省广州市天河区',
                address1: '广东省广州市天河区'
            },
            {
                id: '2',
                type: '入库',
                date: '2019-09-26',
                date1: '2019-09-26',
                name: '张三1',
                status: '1',
                address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
                address1: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
            },
            {
                id: '3',
                type: '入库',
                date: '2019-09-27',
                date1: '2019-09-27',
                name: '张三2',
                status: '1',
                address: '广东省广州市天河区3',
                address1: '广东省广州市天河区3'
            },
            {
                id: '4',
                type: '出库',
                date: '2019-09-27',
                date1: '2019-09-27',
                name: '张三3',
                status: '3',
                address: '广东省广州市天河区3',
                address1: '广东省广州市天河区3'
            },
            {
                id: '5',
                type: '出库',
                date: '2019-09-27',
                date1: '2019-09-27',
                name: '张三4',
                status: '3',
                address: '广东省广州市天河区3',
                address1: '广东省广州市天河区3'
            }
        ],
        tableColumns:[
        {
            prop: 'name',
            label: '姓名',
            bind: { align: 'left' },
            children: [
                {
                prop: 'name',
                label: '姓名',
                children: [
                    {
                    prop: 'type',
                    label: '类型',
                    minWidth: '100',
                    children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }]
                    },
                    {
                    prop: 'status',
                    label: '状态',
                    minWidth: '100',
                    filterFn: (val) => {
                      return this.tableConfig.listTypeInfo.statusList.find((el) => el.dictCode == val).dictName
                    }
                    }
                ]
                },
                {
                prop: 'type',
                label: '表头合并1',
                minWidth: '100',
                children: [
                    {
                    prop: 'type',
                    label: '类型',
                    minWidth: '100',
                    children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }]
                    }
                ]
                },
                { prop: 'name', label: '姓名', minWidth: '100' },
                {
                prop: 'date',
                label: '表头合并2',
                minWidth: '180',
                children: [
                    { prop: 'type', label: '类型', minWidth: '100' },
                    {
                    prop: 'date',
                    label: '日期',
                    minWidth: '180',
                    children: [{ prop: 'date1', label: '日期22', minWidth: '180' }]
                    }
                ]
                }
          ]
        },
        {
          prop: 'name',
          label: '姓名',
          minWidth: '100',
          children: [
            {
              prop: 'type',
              label: '类型',
              minWidth: '100',
              children: [{ prop: 'date1', label: '日期', minWidth: '180' }]
            }
          ]
        },
        {
          prop: 'type',
          label: '表头合并1',
          minWidth: '100',
          children: [
            {
              prop: 'type',
              label: '类型',
              minWidth: '100',
              children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }]
            }
          ]
        },
        { prop: 'name', label: '姓名', minWidth: '100' },
        {
          prop: 'date',
          label: '表头合并2',
          minWidth: '180',
          children: [
            { prop: 'type', label: '类型', minWidth: '100' },
            {
              prop: 'date',
              label: '日期',
              minWidth: '180',
              children: [{ prop: 'date1', label: '日期22', minWidth: '180' }]
            }
          ]
        },
        { prop: 'address', label: '地址', minWidth: '220', bind: { showOverflowTooltip: false } },
        { prop: 'date1', label: '日期', minWidth: '180' },
        { prop: 'address1', label: '地址', minWidth: '220', bind: { align: 'left' } }
        ],
        tableConfig:{
            firstColumn: [{ type: 'index', label: '序号' }],
            listTypeInfo: {
              statusList: [
                { dictName: '进行中', dictCode: '1' },
                { dictName: '待处理', dictCode: '2' },
                { dictName: '已完成', dictCode: '3' }
              ]
            }
        }
      }
    }
  }
</script>
<style>
    .theme-default-content:not(.custom){
        max-width:1180px!important
    }
    table{
        margin:0
    }
    tr:nth-child(2n){background:#fff}
</style>

## 参数说明

```js
//参数说明
tableColumns:[
    {
      label:'姓名',//列名
      prop:'prop',//列属性
      width:'120',//列宽
      minWidth:'200',//最小列宽
      canEdit:false,//是否显示可编辑单元格
      isClickEdit:false,//是否点击显示可编辑单元格
      editConfig:{},//编辑项配置
      filterFn:()=>{},//列过滤方法
      children:[],//多表头子列
      bind:{fixed:true,align:'right'} //第三方组件库属性
    },
]
tableConfig:{
    firstColumn:[ //第一列序号、复选框、单选框的配置,单独设置方便后续扩展
       {
        type:'index',
        label:'序号',
        width:'120',//列宽
        minWidth:'200',//最小列宽
        bind:{},//第三方组件属性
      }
    ],
    listTypeInfo:{ //可编辑表格的下拉框、复选框组、单选框组的选项配置
        hobbyList:[]
        cityList:[]
    },
}

```

## 代码

```vue
<template>
  <div>
    <f-table :tableData="tableData" :tableColumns="tableColumns" :tableConfig="tableConfig" ref="FTable"> </f-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableColumns: [
        {
          prop: 'name',
          label: '姓名',
          bind: { align: 'left' },
          children: [
            {
              prop: 'name',
              label: '姓名',
              children: [
                {
                  prop: 'type',
                  label: '类型',
                  minWidth: '100',
                  children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }]
                },
                {
                  prop: 'status',
                  label: '状态',
                  minWidth: '100',
                  filterFn: (val) => {
                    return this.tableConfig.listTypeInfo.statusList.find((el) => el.dictCode == val).dictName
                  }
                }
              ]
            },
            {
              prop: 'type',
              label: '表头合并1',
              minWidth: '100',
              children: [
                {
                  prop: 'type',
                  label: '类型',
                  minWidth: '100',
                  children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }]
                }
              ]
            },
            { prop: 'name', label: '姓名', minWidth: '100' },
            {
              prop: 'date',
              label: '表头合并2',
              minWidth: '180',
              children: [
                { prop: 'type', label: '类型', minWidth: '100' },
                {
                  prop: 'date',
                  label: '日期',
                  minWidth: '180',
                  children: [{ prop: 'date1', label: '日期22', minWidth: '180' }]
                }
              ]
            }
          ]
        },
        {
          prop: 'name',
          label: '姓名',
          minWidth: '100',
          children: [
            {
              prop: 'type',
              label: '类型',
              minWidth: '100',
              children: [{ prop: 'date1', label: '日期', minWidth: '180' }]
            }
          ]
        },
        {
          prop: 'type',
          label: '表头合并1',
          minWidth: '100',
          children: [
            {
              prop: 'type',
              label: '类型',
              minWidth: '100',
              children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }]
            }
          ]
        },
        { prop: 'name', label: '姓名', minWidth: '100' },
        {
          prop: 'date',
          label: '表头合并2',
          minWidth: '180',
          children: [
            { prop: 'type', label: '类型', minWidth: '100' },
            {
              prop: 'date',
              label: '日期',
              minWidth: '180',
              children: [{ prop: 'date1', label: '日期22', minWidth: '180' }]
            }
          ]
        },
        { prop: 'address', label: '地址', minWidth: '220', bind: { showOverflowTooltip: false } },
        { prop: 'date1', label: '日期', minWidth: '180' },
        { prop: 'address1', label: '地址', minWidth: '220', bind: { align: 'left' } }
      ],
      tableData: [
        {
          id: '1',
          type: '入库',
          date: '2019-09-25',
          date1: '2019-09-25',
          name: '张三',
          status: '2',
          address: '广东省广州市天河区',
          address1: '广东省广州市天河区'
        },
        {
          id: '2',
          type: '入库',
          date: '2019-09-26',
          date1: '2019-09-26',
          name: '张三1',
          status: '1',
          address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
          address1: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
        },
        {
          id: '3',
          type: '入库',
          date: '2019-09-27',
          date1: '2019-09-27',
          name: '张三2',
          status: '1',
          address: '广东省广州市天河区3',
          address1: '广东省广州市天河区3'
        },
        {
          id: '4',
          type: '出库',
          date: '2019-09-27',
          date1: '2019-09-27',
          name: '张三3',
          status: '3',
          address: '广东省广州市天河区3',
          address1: '广东省广州市天河区3'
        },
        {
          id: '5',
          type: '出库',
          date: '2019-09-27',
          date1: '2019-09-27',
          name: '张三4',
          status: '3',
          address: '广东省广州市天河区3',
          address1: '广东省广州市天河区3'
        }
      ],

      tableConfig: {
        firstColumn: [{ type: 'index', label: '序号' }],
        listTypeInfo: {
          statusList: [
            { dictName: '进行中', dictCode: '1' },
            { dictName: '待处理', dictCode: '2' },
            { dictName: '已完成', dictCode: '3' }
          ]
        }
      }
    }
  }
}
</script>
```
