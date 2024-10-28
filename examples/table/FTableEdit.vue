<template>
  <div>
    <el-button @click="save" type="primary">表格数据</el-button>
    <f-table :tableData="tableData" :tableColumns="tableColumns" :tableConfig="tableConfig" ref="FTable">
      <template v-slot:addressEdit="scope">
        <el-input v-model="scope.row.address" type="textarea" :row="4">{{ scope.row.address }}</el-input>
      </template>
      <template v-slot:operation="scope">
        <el-button type="text" @click="saveRow(scope)">保存</el-button>
      </template>
    </f-table>
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
          minWidth: '100',
          canEdit: () => true,
          editConfig: { editComp: 'el-input' }
        },
        {
          prop: 'merge',
          label: '表头合并',
          minWidth: '180',
          children: [
            { prop: 'type', label: '类型', minWidth: '100' },
            {
              prop: 'status',
              label: '状态',
              canEdit: () => true,
              editConfig: { editComp: 'el-select', list: 'statusList', listLabel: 'dictName', listValue: 'dictCode' }
            },
            {
              prop: 'date',
              label: '日期',
              minWidth: '180',
              children: [
                {
                  prop: 'date1',
                  label: '日期22',
                  minWidth: '180',
                  canEdit: () => true,
                  editConfig: { editComp: 'el-date-picker', type: 'date', bind: { valueFormat: 'yyyy-MM-dd' } }
                }
              ]
            }
          ]
        },
        {
          prop: 'address',
          label: '地址',
          minWidth: '220',
          canEdit: () => true,
          bind: { showOverflowTooltip: false }
        },
        { prop: 'city', label: '城市', minWidth: '180' },
        { prop: 'operation', label: '操作' }
      ],
      tableData: [
        {
          id: '1',
          type: '入库',
          city: '上海',
          date1: '2019-09-25',
          name: '张三',
          status: '2',
          address: '广东省广州市天河区'
        },
        {
          id: '2',
          type: '入库',
          city: '北京',
          date1: '2019-09-26',
          name: '张三1',
          status: '1',
          address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
        },
        {
          id: '3',
          type: '入库',
          city: '广州',
          date1: '2019-09-27',
          name: '张三2',
          status: '1',
          address: '广东省广州市天河区3'
        },
        {
          id: '4',
          type: '出库',
          city: '河南',
          date1: '2019-09-27',
          name: '张三3',
          status: '3',
          address: '广东省广州市天河区3'
        },
        {
          id: '5',
          type: '出库',
          city: '天津',
          date1: '2019-09-27',
          name: '张三4',
          status: '3',
          address: '广东省广州市天河区3'
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
  },
  methods: {
    save() {
      console.log(this.tableData)
    },
    saveRow(scope) {
      console.log(scope.row)
    }
  }
}
</script>
