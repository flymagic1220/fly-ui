# 每行展示几列

## 效果

<el-card class="box-card">
  <div>
    <el-radio-group v-model="spanSize" style="margin-bottom: 20px">
      <el-radio-button :label="1">一行展示1列</el-radio-button>
      <el-radio-button :label="2">两行展示2列</el-radio-button>
      <el-radio-button :label="3">三行展示3列</el-radio-button>
      <el-radio-button :label="4">四行展示4列</el-radio-button>
      <el-radio-button :label="5">五行展示5列</el-radio-button>
    </el-radio-group>
    <f-form ref="FForm" :data="formData" :formOpt="formOpt"  :formSpan="spanSize" />
  </div>
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
        formOpt: {
          labelPosition: 'top',
          labelWidth:'100px',
          filedList:[
            {label: '账号', prop: 'account', comp: 'el-input'},
            { label: '密码', prop: 'password', type: 'password', comp: 'el-input' },
            {label: '昵称', prop: 'name', comp: 'el-input'},
            { label: '平台用户', prop: 'accountType',  comp: 'el-select', list: 'accountTypeList' ,listLabel: 'dicName', listValue: 'dicValue'},
            {label: '性别', prop: 'sex',comp: 'el-radio-group', list: 'sexList',  listLabel: 'dicName', listValue: 'dicValue'},
            { label: '爱好', prop: 'hobby', comp: 'el-checkbox-group', list: 'hobbyList',},
            {
                label: '城市', prop: 'city', comp: 'el-select', list: 'cityList',
                bind: { multiple: true }
            },
            {
                label: '日期', prop: 'date', type: 'date', comp: 'el-date-picker',span:2,
                bind: {valueFormat:'yyyy-MM-dd'}
            },
            { label: '手机号码', prop: 'phone', comp: 'el-input', bind: { maxlength: 11 } },
            { label: '描述', prop: 'desc', type: 'textarea', comp: 'el-input' ,span:1}
          ],
          operatorList: [
            { label: '提交', type: 'danger', fun: this.submitForm },
            { label: '重置', type: 'primary', fun: this.resetForm },
          ],
          listTypeInfo: {
            cityList: [],
            sexList: [
              { dicName: '男', dicValue: '0' },
              {dicName:'女',dicValue:'1'}
            ],
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
      }
    }
  }
</script>

<style>
    .theme-default-content:not(.custom){
        max-width:1180px!important
    }
</style>

## 参数说明

```js
//参数说明
formSpan:2, // 一行显示几列，默认占一行
formOpt{
  filedList：{
       ... // 请参考基本使用中的参数说明或 FForm参数配置
       span:2, //一行展示几列，优先级高于 fromSpan属性
  }
}

```

## 代码

```vue
<template>
  <div>
    <el-radio-group v-model="spanSize" style="margin-bottom: 20px">
      <el-radio-button :label="1">一行展示1列</el-radio-button>
      <el-radio-button :label="2">两行展示2列</el-radio-button>
      <el-radio-button :label="3">三行展示3列</el-radio-button>
      <el-radio-button :label="4">四行展示4列</el-radio-button>
      <el-radio-button :label="5">五行展示5列</el-radio-button>
    </el-radio-group>
    <f-form ref="FForm" :data="formData" :formOpt="formOpt" :formSpan="spanSize" />
  </div>
</template>
<script lang="js">
export default {
  data() {
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
      formOpt: {
        labelPosition: 'top',
        labelWidth:'100px',
        filedList:[
          {
            label: '账号', prop: 'account', comp: 'el-input',
          },
          { label: '密码', prop: 'password', type: 'password', comp: 'el-input' },
          {
            label: '昵称', prop: 'name', comp: 'el-input',
          },
          { label: '平台用户', prop: 'accountType',  comp: 'el-select', list: 'accountTypeList' ,listLabel: 'dicName', listValue: 'dicValue'},
          {label: '性别', prop: 'sex',comp: 'el-radio-group', list: 'sexList',  listLabel: 'dicName', listValue: 'dicValue'},
          { label: '爱好', prop: 'hobby', comp: 'el-checkbox-group', list: 'hobbyList',},
          {
            label: '城市', prop: 'city', comp: 'el-select', list: 'cityList',
            bind: { multiple: true }
          },
          {
            label: '日期', prop: 'date', type: 'date', comp: 'el-date-picker',span:2,
            bind: {valueFormat:'yyyy-MM-dd'}
          },
          { label: '手机号码', prop: 'phone', comp: 'el-input', bind: { maxlength: 11 } },
          { label: '描述', prop: 'desc', type: 'textarea', comp: 'el-input' ,span:1}
        ],
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm },
        ],
        listTypeInfo: {
          cityList: [],
          sexList: [
            { dicName: '男', dicValue: '0' },
            {dicName:'女',dicValue:'1'}
          ],
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
    }
  }
}
</script>
```
