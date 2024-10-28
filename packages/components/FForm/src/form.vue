<template>
  <el-form :model="formData" :rules="formRules" :label-width="formOpt.labelWidth || '120px'" :label-position="formOpt.labelPosition || 'right'" ref="formRef" class="f-form" v-bind="$attrs">
    <el-form-item v-for="item in formOpt.filedList" :label="item.label" :prop="item.prop" :key="item.prop" :rules="item.rules" v-bind="{ ...item.bind }" :style="getChildWidth(item)" class="f-form-item">
      <!-- 自定义label -->
      <template #label v-if="item.labelRender">
        <render-comp v-if="item.renderFun" :createElementFunc="item.renderFun" />
        <slot :name="item.labelSlot" :scope="item"></slot>
      </template>
      <!-- 自定义输入框插槽 -->
      <template v-if="item.slotName">
        <slot :name="item.slotName" :scope="item"></slot>
      </template>
      <!-- 文本展示值 -->
      <template v-if="item.textShow">
        <span class="textValue el-input__inner">{{ item.textValue || formOpt.formData[item.prop] }}</span>
      </template>
      <component
        :is="item.comp"
        :type="item.type"
        v-model="formData[item.prop]"
        :placeholder="getPlaceholder(item)"
        :style="{ width: item.width || '100%' }"
        v-bind="{ clearable: true, ...item.bind }"
        @change="eventChange(item.prop, $event)"
        v-on="bindEvent(item)"
      >
        <template #prepend v-if="item.prepend">{{ item.prepend }}</template>
        <template #append v-if="item.append">{{ item.append }}</template>
        <template v-if="item.childSlotName">
          <slot :name="item.childSlotName"></slot>
        </template>
        <template v-else>
          <component :is="compChildName(item)" v-for="op in selectListType(item)" :key="op.value" :label="compChildLabel(op, item)" :value="compChildValue(op, item)">
            {{ compChildShowLabel(op, item) }}
          </component>
        </template>
      </component>
    </el-form-item>
    <!-- 操作按钮 -->
    <div class="footer_btn" v-if="formOpt.btnSlotName || formOpt.operatorList">
      <template v-if="formOpt.btnSlotName">
        <slot :name="formOpt.btnSlotName"></slot>
      </template>
      <template v-if="!formOpt.btnSlotName && formOpt.operatorList && formOpt.operatorList.length > 0">
        <el-button
          v-for="(val, index) in formOpt.operatorList"
          :key="index"
          @click="val.fun(val)"
          v-bind="{
            type: val.type || 'primary',
            size: val.size || 'small',
            ...val.bind
          }"
          >{{ val.label }}</el-button
        >
      </template>
    </div>
  </el-form>
</template>
<script>
import renderComp from './renderComp.vue'
export default {
  name: 'f-form',
  components: { renderComp },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    },
    /**
     labelPosition: label位置
     labelWidth：label宽度
     btnSlotName:自定义操作按钮插槽
     filedList：{ //表单配置项
       label:'姓名',//标签,
       prop:'name', //属性,
       type:'text', //组件类型
       comp:'el-input' //动态组件
       width:'120px' ,// 表单宽度
       placeHolder:'请输入姓名', // 提示信息
       rules:[],//校验规则
       slotName:'nameSlot', //自定义插槽的名字
       labelRender: true, // 是否自定义label
       renderFun:fn, // 自定义label的渲染函数
       list:[], // 下拉菜单、复选框组、单选框组的数据
       listLabel:'label', // list的label对应的字段code
       listValue:'value', //list的value对应的字段code
       eventHandle:{focus:fn,blur:fn}， //事件绑定
       bind:{labelWidth:'120px',clearable:false,valueFormat:'yyyy-MM-dd',....} //第三方组件绑定的属性
     }
     operatorList:[],//操作按钮
     listTypeInfo：options下拉框
     */
    formOpt: {
      type: Object,
      default: () => {}
    },
    formSpan: {
      // el-form-item布局占的宽度,默认占一行
      type: Number,
      default: 1
    }
  },
  watch: {
    data: {
      handler(val) {
        this.formData = val
      },
      immediate: true,
      deep: true
    },
    rules: {
      handler(val) {
        this.formRules = val
      },
      immediate: true,
      deep: true
    },
    formSpan(val) {
      this.colSpan = val
    }
  },
  data() {
    return {
      formData: {},
      formRules: {},
      colSpan: this.formSpan
    }
  },
  computed: {
    compChildName() {
      return ({ comp }) => {
        switch (comp) {
          case 'el-select':
            return 'el-option'
          case 'el-checkbox-group':
            return 'el-checkbox'
          case 'el-radio-group':
            return 'el-radio'
        }
      }
    },
    selectListType() {
      return ({ list }) => {
        if (this.formOpt.listTypeInfo) {
          return this.formOpt.listTypeInfo[list]
        } else {
          return []
        }
      }
    },
    //子组件的label
    compChildLabel() {
      return (op, { comp, listLabel, listValue }) => {
        switch (comp) {
          case 'el-select':
            return op[listLabel || 'label']
          case 'el-checkbox-group':
          case 'el-radio-group':
            return op[listValue || 'value']
        }
      }
    },
    //子组件的value
    compChildValue() {
      return (op, { listValue }) => {
        return op[listValue || 'value']
      }
    },
    // 组件的文字展示
    compChildShowLabel() {
      return (op, { listLabel }) => {
        return op[listLabel || 'label']
      }
    },
    //事件绑定  v-on的值是一个对象，一次绑定多个事件
    // v-on={focus:fn,blur:fn}
    bindEvent() {
      return ({ eventHandle }) => {
        let event = { ...eventHandle }
        let changeEvent = {}
        Object.keys(event).forEach((v) => {
          changeEvent[v] = (e) => {
            event[v] && event[v](e || {}, this.formOpt, arguments)
          }
        })
        return { ...changeEvent }
      }
    }
  },
  methods: {
    // placeholder的显示
    getPlaceholder(row) {
      let placeholder = ''
      if (row.comp && typeof row.comp == 'string') {
        if (row.comp.includes('input')) {
          placeholder = '请输入' + row.label
        } else if (row.comp.includes('select') || row.comp.includes('picker')) {
          placeholder = '请选择' + row.label
        } else {
          placeholder = row.label
        }
      }
      return placeholder
    },
    // label与输入框的布局方式
    getChildWidth(item) {
      if (this.formOpt.labelPosition === 'top') {
        return `flex: 0 1 calc((${100 / (item.span || this.colSpan)}% - 10px));margin-right:10px;`
      } else {
        return `flex: 0 1 ${100 / (item.span || this.colSpan)}%;`
      }
    },
    //校验
    validate() {
      return new Promise((resolve) => {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            resolve({ valid, formData: this.formData, success: true })
          } else {
            resolve({ valid, formData: this.formData, success: false })
          }
        })
      })
    },
    // 重置表单
    resetForm() {
      return this.$refs.formRef.resetFields()
    },
    // 清空校验
    clearValidate() {
      return this.$refs.formRef.clearValidate()
    },
    //change事件
    eventChange(prop, val) {
      this.$emit('eventChange', prop, val)
    }
  }
}
</script>
<style lang="scss" scoped>
.f-form {
  display: flex;
  flex-wrap: wrap;
  .f-form-item {
    display: inline-block;
    width: 100%;
    .el-form-item__content {
      .el-input,
      .el-select,
      .el-date-editor,
      .el-textarea {
        width: 100%;
      }
      .el-input-number {
        .el-input {
          width: inherit;
        }
      }
    }
  }
  .footer_btn {
    width: 100%;
    text-align: center;
  }
}
</style>
