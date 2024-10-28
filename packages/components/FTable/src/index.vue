<template>
  <el-table :data="tableData" style="width: 100%" class="f-table" v-on="$listeners">
    <tableColumn :columns="tableColumns" :data="tableData" v-bind="$attrs" ref="elTableColumnRef">
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </tableColumn>
  </el-table>
</template>

<script>
import tableColumn from './tableColumn.vue'
export default {
  name: 'f-table',
  components: { tableColumn },
  props: {
    tableColumns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 行校验
    rowValidate(rowIndex) {
      const refsArr = []
      this.getAllRef(this.$refs.elTableColumnRef.getRefs(), refsArr) //所有单元格对应的form的ref
      const rowCellRefs = [] // 指定行的单元格中form的ref
      Object.values(refsArr).filter(({ key, vueComp }) => {
        const name = `singleEditForm-${rowIndex}`
        if (key.includes(name)) {
          rowCellRefs.push(vueComp)
        }
      })
      const validateRes = [] // 单元格的校验结果
      rowCellRefs.forEach((el) => {
        el.validate((valid) => {
          valid ? validateRes.push(true) : validateRes.push(false)
        })
      })
      return validateRes.every((el) => el === true)
    },
    // 整个table校验
    tableValidate() {
      const refsArr = []
      this.getAllRef(this.$refs.elTableColumnRef.getRefs(), refsArr) //所有单元格对应的form的ref
      const validateRes = [] // 单元格的校验结果
      Object.values(refsArr).forEach(({ key, vueComp }) => {
        if (key !== 'elTableColumnRef') {
          vueComp.validate((valid) => {
            valid ? validateRes.push(true) : validateRes.push(false)
          })
        }
      })
      return validateRes.every((el) => el === true)
    },
    // 递归循环拿到所有单元格的ref(为了获取递归的多级表头的单元格ref)
    getAllRef(obj, arr) {
      Object.keys(obj).forEach((el) => {
        arr.push({ key: el, vueComp: obj[el][0] })
      })
      if (obj.elTableColumnRef && obj.elTableColumnRef.length) {
        this.getAllRef(obj.elTableColumnRef[0].getRefs(), arr)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.f-table ::v-deep .is-group tr:nth-child(odd) {
  display: none;
}
</style>
