# 校验及插槽使用

## 效果

<el-card class="box-card">
  <f-form ref="FForm" :data="formData" :rules="formRules" :formOpt="formOpt">
    <!-- 插槽自定义label -->
    <template v-slot:accountLabel>
      <span style="color: blue; font-weight: bold">账号</span>
    </template>
    <!-- 插槽自定义表单项 -->
    <template v-slot:sexSlot>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
    <!-- 插槽自定义操作按钮 -->
    <template v-slot:operationSlot>
      <el-button type="primary" size="small" @click="submitForm">提交</el-button>
      <el-button type="" size="small" @click="resetForm">重置</el-button>
      <el-button type="danger" size="small" @click="clearValidate">清除校验</el-button>
    </template>
  </f-form>
</el-card>

<script lang="js">
  export default{
    data(){
      return {
        spanSize:1,
        formData: {
            account: null,
            password: null,
            name: null,
            accountType: null,
            sex: null,
            hobby: [],
            city:[],
            phone: null,
            desc: null,
        },
        formRules: {
            account: { required: true, message: '请输入账号', trriger: 'blur' },
            password:{required: true, message: '请输入密码', trriger: 'blur'},
            accountType: { required: true, message: '请选择平台', trriger: 'change' },
            phone: { required: true, message: '请输入手机号', trriger: 'blur' },
            sex:{required: true, message: '请选择性别', trriger: 'change'},
            desc:{required: true, message: '请输入描述', trriger: 'blur'}
        },
        formOpt: {
          filedList:[
            {
                label: '账号', prop: 'account', comp: 'el-input',
                labelRender:true, renderFun: () =>{
                 return (
                    <span style="color:blue;font-weight:bold">账号</span>
                )},
                bind:{clearable:true, labelWidth: '200px'},
            },
            {
                label: '密码', prop: 'password', type: 'password', comp: 'el-input',
                labelRender: true, renderFun: () => {// 渲染函数自定义label
                return (
                    <span style="color:purple;font-size:20px;font-weight:bold">密码</span>
                )
                },
            },
            {
                label: '昵称', prop: 'name', comp: 'el-input',
                rules:[{required: true, message: '请输入昵称', trriger: true}]
            },
            { label: '平台用户', prop: 'accountType',  comp: 'el-select', list: 'accountTypeList' ,listLabel: 'dicName', listValue: 'dicValue'},
            {label: '性别', prop: 'sex',slotName:'sexSlot'},
            { label: '爱好', prop: 'hobby', comp: 'el-checkbox-group', list: 'hobbyList'},
            {
                label: '城市', prop: 'city', comp: 'el-select', list: 'cityList',
                rules:[{required: true, message: '请选择城市', trriger: 'change'}],
                bind: { multiple: true }
            },
            {
                label: '日期', prop: 'date', type: 'date', comp: 'el-date-picker',
                rules:[{required: true, message: '请选择日期', trriger: 'blur'}],
                bind: {valueFormat:'yyyy-MM-dd'}
            },
            { label: '手机号码', prop: 'phone', comp: 'el-input', bind: { maxlength: 11 } },
            { label: '描述', prop: 'desc', type: 'textarea', comp: 'el-input' }
          ],
          operatorList: [
            { label: '提交', type: 'danger', fun: this.submitForm },
            { label: '重置', type: 'primary', fun: this.resetForm },
          ],
          listTypeInfo: {
            cityList: [],
            hobbyList:[
                { label: '打篮球', value: '0' },
                { label: '看抖音', value: '1' },
                { label: '吉他', value: '2' },
                { label: '旅游', value: '3' },
                { label: '音乐', value: '4' }
            ],
            accountTypeList: [
                { dicName: '手机用户', dicValue: '0' },
                { dicName: '论坛用户', dicValue: '1' },
                {dicName:'平台用户',dicValue:'2'}]
          }
        }
      }
    },
    mounted() {
      this.getDict()
    },
    methods: {
      getDict() {
        //模拟请求
        setTimeout(() => {
          this.formOpt.listTypeInfo.cityList = [
            { label: '上海', value: 'shanghai' },
            { label: '北京', value: 'beijing' },
            {label: '广州', value: 'guangzhou'}
          ]
        }, 1000);
      },
      submitForm() {
        this.$refs.FForm.validate().then(({formData,success}) => {
          console.log(formData,success)
        })
      },
      resetForm() {
        this.$refs.FForm.resetForm()
      },
      clearValidate() {
        this.$refs.FForm.clearValidate()
        }
    }
  }
</script>

<style>
    .theme-default-content:not(.custom){
        max-width:1180px!important
    }
</style>

## 代码

```vue
<template>
  <f-form ref="FForm" :data="formData" :rules="formRules" :formOpt="formOpt" @eventChange="eventChange">
    <!-- 插槽自定义label -->
    <template v-slot:accountLabel="scope">
      <span style="color: blue; font-weight: bold">{{ scope.scope.label }}</span>
    </template>
    <!-- 插槽自定义表单项 -->
    <template v-slot:sexSlot="scope">
      <el-form-item :label="scope.label" prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
    <!-- 插槽自定义操作按钮 -->
    <template v-slot:operationSlot>
      <el-button type="primary" size="small" @click="submitForm">提交</el-button>
      <el-button type="" size="small" @click="resetForm">重置</el-button>
      <el-button type="danger" size="small" @click="clearValidate">清除校验</el-button>
    </template>
  </f-form>
</template>
<script lang="js">
export default {
  data() {
    return {
      formData: {
          account: null,
          password: null,
          name: null,
          accountType: null,
          sex: null,
          hobby: [],
          city:[],
          phone: null,
          desc: null,
      },
      formRules: {
        account: { required: true, message: '请输入账号', trriger: 'blur' },
        password:{required: true, message: '请输入密码', trriger: 'blur'},
        accountType: { required: true, message: '请选择平台', trriger: 'change' },
        phone: { required: true, message: '请输入手机号', trriger: 'blur' },
        sex:{required: true, message: '请选择性别', trriger: 'change'},
        desc:{required: true, message: '请输入描述', trriger: 'blur'}
      },
      formOpt: {
        btnSlotName:'operationSlot',
        filedList:[
          {
            label: '账号', prop: 'account', comp: 'el-input',
            labelRender:true, labelSlot:'accountLabel',
            bind:{clearable:true, labelWidth: '200px'},
          },
          {
            label: '密码', prop: 'password', type: 'password', comp: 'el-input',
            labelRender: true, renderFun: () => {// 渲染函数自定义label
              return (
                <span style="color:purple;font-size:20px;font-weight:bold">密码</span>
              )
            },
           },
          {
            label: '昵称', prop: 'name', comp: 'el-input',
            rules:[{required: true, message: '请输入昵称', trriger: true}]
          },
          { label: '平台用户', prop: 'accountType',  comp: 'el-select', list: 'accountTypeList' ,listLabel: 'dicName', listValue: 'dicValue'},
          {label: '性别', prop: 'sex',slotName:'sexSlot'},
          { label: '爱好', prop: 'hobby', comp: 'el-checkbox-group', list: 'hobbyList'},
          {
            label: '城市', prop: 'city', comp: 'el-select', list: 'cityList',
            rules:[{required: true, message: '请选择城市', trriger: 'change'}],
            bind: { multiple: true }
          },
          {
            label: '日期', prop: 'date', type: 'date', comp: 'el-date-picker',
            rules:[{required: true, message: '请选择日期', trriger: 'blur'}],
            bind: {valueFormat:'yyyy-MM-dd'}
          },
          { label: '手机号码', prop: 'phone', comp: 'el-input', bind: { maxlength: 11 } },
          { label: '描述', prop: 'desc', type: 'textarea', comp: 'el-input' }
        ],
        listTypeInfo: {
          cityList: [],
          hobbyList:[
             { label: '打篮球', value: '0' },
             { label: '看抖音', value: '1' },
             { label: '吉他', value: '2' },
             { label: '旅游', value: '3' },
             { label: '音乐', value: '4' }
          ],
          accountTypeList: [
            { dicName: '手机用户', dicValue: '0' },
            { dicName: '论坛用户', dicValue: '1' },
            {dicName:'平台用户',dicValue:'2'}]
        }

      },
    }
  },
  mounted() {
    this.getDict()
  },
  methods: {
    getDict() {
      //模拟请求
      setTimeout(() => {
        this.formOpt.listTypeInfo.cityList = [
          { label: '上海', value: 'shanghai' },
          { label: '北京', value: 'beijing' },
          {label: '广州', value: 'guangzhou'}
        ]
      }, 1000);
    },
    submitForm() {
      this.$refs.FForm.validate().then(({formData,success}) => {
        console.log(formData,success)
      })
     },
    resetForm() {
      this.$refs.FForm.resetForm()
    },
    clearValidate() {
      this.$refs.FForm.clearValidate()
    }
  }
}
</script>
```
