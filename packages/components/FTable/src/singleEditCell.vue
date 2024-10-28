<template>
  <el-form-item :prop="prop" label-width="0px" :rules="(eidtConfig && eidtConfig.rules) || []" v-on="$listeners">
    <template v-if="$scopedSlots[`${prop}Edit`]">
      <slot :name="`${prop}Edit`" v-bind="record"></slot>
    </template>
    <component v-else :is="eidtConfig.editComp" :type="eidtConfig.type" v-model="currentValue" style="width: 100%" v-bind="{ ...eidtConfig.bind }" ref="editCellComp">
      <!-- <template #prepend v-if="eidtConfig.prepend">{{ eidtConfig.prepend }}</template>
      <template #append v-if="eidtConfig.append">{{ eidtConfig.append }}</template> -->
      <template v-if="eidtConfig.childSlotName">
        <slot :name="eidtConfig.childSlotName"></slot>
      </template>
      <template>
        <component
          :is="compChildName(eidtConfig)"
          v-for="op in selectListType(eidtConfig)"
          :key="op.value"
          :label="compChildLabel(op, eidtConfig)"
          :value="compChildValue(op, eidtConfig)"
          v-bind="{ clearable: true, ...eidtConfig.bind }"
          v-on="bindEvent(eidtConfig)"
        >
          {{ compChildShowLabel(op, eidtConfig) }}
        </component>
      </template>
    </component>
  </el-form-item>
</template>
<script lang="js">

export default {
  props: {
    /**
      编辑配置项说明
     editComp：'el-input', //组件,
     type:'text'
     rules:[{ required: true, message: '内容不能为空', trigger: 'blur' }], //校验规则，
     list: hobbyList, //listTypeInfo中对应的下拉框数据源
     listLabel:'label', //下拉框数据的label字段
     listValue:'value', //下拉框数据的value字段
     bind:{} //第三方组件库的属性
     */
    eidtConfig: {
      type: Object,
      default:()=>{}
    },
    // scope
    record: {
      type: Object,
      default:()=>{}
    },
    // 下拉选择数据源
    listTypeInfo: {
      type: Object,
      default:()=>{}
    },
    // 编辑的字段名
    prop: {
      type: String,
      default:''
    },

  },
  computed: {
    currentValue: {
      get: function() {
        return this.record.row[this.prop];
      },
      set: function(newValue) {
        this.$emit("input", newValue); // 通过 input 事件更新 model
      }
    },
    compChildName() {
      return ({ editComp }) => {
        switch (editComp) {
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
      return (editConfig) => {
        if (this.listTypeInfo) {
          return this.listTypeInfo[editConfig.list]
        } else {
          return []
        }
      }
    },
    //子组件的label
    compChildLabel() {
      return (op, { editComp, listLabel, listValue }) => {
        switch (editComp) {
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
    // v-on={focus:fn,blur:fn,change:fn}
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
    domFocus() { //获取焦点
      return this.$refs.editCellComp.focus()
    }
  }
}
</script>
