<template>
  <div>
    <f-table :tableData="tableData" :tableColumns="tableColumns" :tableConfig="tableConfig" ref="FTable">
      <template v-slot:nameHeader="scope">
        <span>{{ scope.column.label }}</span>
        <i class="el-icon-edit"></i>
      </template>
      <template v-slot:date1Header="scope">
        <span>{{ scope.column.label }}</span>
        <i class="el-icon-time"></i>
      </template>
      <template v-slot:status="scope">
        <el-tag v-if="scope.row.status === '1'" type="warning" size="small">进行中</el-tag>
        <el-tag v-if="scope.row.status === '2'" type="primary" size="small">待处理</el-tag>
        <el-tag v-if="scope.row.status === '3'" type="success" size="small">已完成</el-tag>
      </template>
    </f-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableColumns: [
        { prop: 'name', label: '姓名', minWidth: '100' },
        {
          prop: 'merge',
          label: '表头合并',
          minWidth: '180',
          children: [
            { prop: 'type', label: '类型', minWidth: '100' },
            { prop: 'status', label: '状态' },
            {
              prop: 'date',
              label: '日期',
              minWidth: '180',
              children: [{ prop: 'date1', label: '日期22', minWidth: '180' }]
            }
          ]
        },
        { prop: 'address', label: '地址', minWidth: '220', bind: { showOverflowTooltip: false } },
        { prop: 'city', label: '城市', minWidth: '180' }
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
      // columns的配置项优先级高于tableConfig
      tableConfig: {
        firstColumn: [{ type: 'index', label: '序号' }]
      }
    }
  }
}
</script>
