<template>
  <el-table-column class="f-table-column">
    <!-- 对序号、复选框、单选框的处理 -->
    <template v-if="tableConfig && tableConfig.firstColumn.length">
      <el-table-column v-for="(col, index) in tableConfig.firstColumn" :key="`${col.prop}${index}`" :type="col.type" :label="col.label" :width="col.width || '60px'" :minWidth="col.minWidth" v-bind="{ align: 'center', ...col.bind }">
      </el-table-column>
    </template>

    <template v-for="(item, itemIndex) in columns">
      <!-- 多级表头递归循环 -->
      <el-table-column
        v-if="item.children && item.children.length"
        :key="`${item.prop}${itemIndex}`"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :minWidth="item.minWidth"
        v-bind="{ showOverflowTooltip: true, align: 'center', ...item.bind }"
      >
        <template #header="scope">
          <span v-if="$scopedSlots[`${item.prop}Header`]">
            <slot :name="`${item.prop}Header`" v-bind="scope"></slot>
          </span>
          <span v-else>{{ scope.column.label }} </span>
        </template>
        <f-table-column :columns="item.children || []" :data="data" :tableConfig="emptyFirtColumn(tableConfig)" ref="elTableColumnRef">
          <!-- 多表头单元格对应的插槽内容传递 -->
          <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </f-table-column>
      </el-table-column>
      <!-- 主体内容 -->
      <el-table-column v-else :key="`${item.prop}${itemIndex}`" :label="item.label" :prop="item.prop" :width="item.width" :minWidth="item.minWidth" v-bind="{ showOverflowTooltip: true, align: 'center', ...item.bind }">
        <template #header="scope">
          <!-- 自定义单元格表头插槽，插槽的名字就是prop属性值 -->
          <span v-if="$scopedSlots[`${item.prop}Header`]">
            <slot :name="`${item.prop}Header`" v-bind="scope"></slot>
          </span>
          <span v-else>{{ scope.column.label }} </span>
        </template>
        <template slot-scope="scope">
          <!-- 自定义单元格内容插槽，插槽的名字就是prop属性值 -->
          <span v-if="$scopedSlots[item.prop]">
            <slot :name="item.prop" v-bind="scope"></slot>
          </span>
          <!-- 显示可编辑的单元格 -->
          <el-form v-else-if="item.canEdit && item.canEdit({ column: item, row: scope.row })" :model="data[scope.$index]" :ref="`singleEditForm-${scope.$index}-${item.prop || scope.column.property}`">
            <SingleEditCell :eidtConfig="item.editConfig" :record="scope" :prop="item.prop" v-model="scope.row[scope.column.property]" :listTypeInfo="listTypeInfo">
              <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
              </template>
            </SingleEditCell>
          </el-form>
          <!-- 点击开启单元格编辑功能 -->
          <div v-else-if="item.isClickEdit && item.isClickEdit({ column: item, row: scope.row })" @click="onClickEdit(scope.$index, scope.column)" class="editDiv">
            <el-form v-if="scope.$index == editPosition.rowIndex && scope.column.property == editPosition.property" :model="data[scope.$index]" :ref="`singleEditForm-${scope.$index}-${item.prop || scope.column.property}`">
              <SingleEditCell :eidtConfig="item.editConfig" :record="scope" :prop="item.prop" v-model="scope.row[scope.column.property]" :listTypeInfo="listTypeInfo" :ref="`singleEditCell-${scope.$index}-${item.prop || scope.column.property}`">
                <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                  <slot :name="name" v-bind="data"></slot>
                </template>
              </SingleEditCell>
            </el-form>
            <span v-else-if="item.filterFn">{{ scope.row[item.prop] | filterFn(item.filterFn, scope.row, item) }}</span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </div>
          <span v-else-if="item.filterFn">{{ scope.row[item.prop] | filterFn(item.filterFn, scope.row, item) }}</span>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>
<script lang="js">
import SingleEditCell from './singleEditCell.vue';

export default {
  name: 'f-table-column',
  components:{SingleEditCell},
  props: {
    /*
      label:'姓名',//列名
      prop:'prop',//列属性
      width:'120',//列宽
      minWidth:'200',//最小列宽
      canEdit:false,//是否显示可编辑单元格
      isClickEdit:false,//是否点击显示可编辑单元格
       filterFn:()=>{},//列过滤方法
      editConfig:{},//编辑项配置
      children:[],//多表头子列
      bind:{fixed:true,align:'right'} //第三方组件库属性
    */
      columns: {
          type: Array,
          default: () => []
      },
      data: {
        type: Array,
          default:()=>[]
    },
      /**
        firstColumn:[ //第一列序号、复选框、单选框的配置,单独设置方便后续扩展
          {
            type:'index',
            label:'序号',
            width:'120',//列宽
            minWidth:'200',//最小列宽
            bind:{},//第三方属性
          }
        ],
        listTypeInfo:{ //可编辑表格的下拉框、复选框组、单选框组的选项配置
          hobbyList:[]
        },
       */
      tableConfig: {
        type: Object,
        default:()=>{}
      }
  },
  computed: {
    // rules() {
    //   return this.tableConfig&&this.tableConfig.rules?this.tableConfig.rules:{}
    // },
    listTypeInfo() {
      return this.tableConfig && this.tableConfig.listTypeInfo ? this.tableConfig.listTypeInfo : {}
    }
  },
  data() {
    return {
      editPosition: {
        rowIndex: -1,
        property: ''
      }
    }
  },
  filters: {
    filterFn(val, callback, row, col) {
      return callback(val, row, col)
    }
  },
  methods: {
    emptyFirtColumn(editConfig) { // 递归循环时，firstColumn的内容不需要再显示了，所以需要置空
      return {...editConfig,firstColumn:[]}
    },
    getRefs() {
      return this.$refs
    },
    onClickEdit(rowIndex,column) {
      this.editPosition.rowIndex = rowIndex
      this.editPosition.property = column.property
      this.$nextTick(() => {
        const refName = `singleEditCell-${rowIndex}-${column.property}`
        if (this.$refs[refName]&&this.$refs[refName].length ) this.$refs[refName][0].domFocus()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.editDiv {
  min-height: 23px;
  cursor: pointer;
}
</style>
