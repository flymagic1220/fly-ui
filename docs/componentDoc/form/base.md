# 基本使用

## 效果

<el-card class="box-card">
  <f-form ref="FForm" :data="formData" :formOpt="formOpt" @eventChange="eventChange" />
</el-card>

<script lang="js">
  export default{
    data(){
      return {
        type:'primary',
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
          filedList:[
            {
              label: '账号', prop: 'account', comp: 'el-input',
              eventHandle: {
                focus:(event,scope)=> this.accountFocus(event,scope),
                blur: (event,scope)=>this.accountBlur(event,scope),
                change:(val,scope)=>this.accountChange(val,scope)
              },
              bind:{clearable:true, labelWidth: '200px'},
            },
            { label: '密码', prop: 'password', type: 'password', comp: 'el-input' },
            {
              label: '昵称', prop: 'name', comp: 'el-input',
              eventHandle: {
                input: (val,scope)=> this.nameInput(val,scope),
                clear:()=> this.nameClear()
              }
            },
            { label: '平台用户', prop: 'accountType',  comp: 'el-select', list: 'accountTypeList' ,listLabel: 'dicName', listValue: 'dicValue'},
            {label: '性别', prop: 'sex',comp: 'el-radio-group', list: 'sexList',  listLabel: 'dicName', listValue: 'dicValue'},
            { label: '爱好', prop: 'hobby', comp: 'el-checkbox-group', list: 'hobbyList',},
            {
              label: '城市', prop: 'city', comp: 'el-select', list: 'cityList',
              eventHandle: {
                change:(val,scope)=>this.cityChange(val,scope)
              },
              bind: { multiple: true }
            },
            {
              label: '日期', prop: 'date', type: 'date', comp: 'el-date-picker',
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
      accountFocus(event) {
        console.log('account 获取焦点事件---',event)
      },
      accountBlur(event) {
        console.log('account 失去焦点事件---',event)
      },
      accountChange(val) {
        console.log('account change事件---',val)
      },
      nameInput(val) {
        console.log('name Input事件---',val)
      },
      nameClear() {
        console.log('name 清空---')
      },
      cityChange(val) {
        console.log('city change事件----',val)
      },
      eventChange(prop, val) {
        if (prop == 'hobby') {
          console.log('hobby Value----',val)
        } else if (prop === 'sex') {
          console.log('sex value ----',val)
        }
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
formOpt{
  labelPosition:'right' //label位置 right、top、left （表单项的优先级高于此优先级）
  labelWidth: '120px' //label宽度 （表单项的优先级高于此优先级）
  filedList：{ //表单配置项
       label:'姓名',//标签,
       prop:'name', //属性,
       type:'text', //组件类型
       comp:'el-input' //动态组件
       width:'120px' ,// 表单宽度
       placeHolder:'请输入姓名', // 提示信息
       list:[], // 下拉菜单、复选框组、单选框组的数据
       listLabel:'label', // list的label对应的字段code
       listValue:'value', //list的value对应的字段code
       eventHandle:{focus:fn,blur:fn}， //事件绑定
       bind:{labelWidth:'120px',clearable:false,valueFormat:'yyyy-MM-dd',....} //第三方组件绑定的属性
  }
  listTypeInfo：//options下拉框
}

```

## 代码

change 事件即可单独绑定，也可以使用 f-form 组件提供的 eventChange

```vue
<template>
  <f-form ref="FForm" :data="formData" :formOpt="formOpt" @eventChange="eventChange" />
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

      formOpt: {
        labelPosition:'right',
        labelWidth:'120px'
        filedList:[
          {
            label: '账号', prop: 'account', comp: 'el-input',
            eventHandle: {
              focus:(event,scope)=> this.accountFocus(event,scope),
              blur: (event,scope)=>this.accountBlur(event,scope),
              change:(val,scope)=>this.accountChange(val,scope)
            },
            bind:{clearable:true, labelWidth: '200px'},
          },
          { label: '密码', prop: 'password', type: 'password', comp: 'el-input' },
          {
            label: '昵称', prop: 'name', comp: 'el-input',
            eventHandle: {
              input: (val,scope)=> this.nameInput(val,scope),
              clear:()=> this.nameClear()
            }
          },
          { label: '平台用户', prop: 'accountType',  comp: 'el-select', list: 'accountTypeList' ,listLabel: 'dicName', listValue: 'dicValue'},
          {label: '性别', prop: 'sex',comp: 'el-radio-group', list: 'sexList',  listLabel: 'dicName', listValue: 'dicValue'},
          { label: '爱好', prop: 'hobby', comp: 'el-checkbox-group', list: 'hobbyList',},
          {
            label: '城市', prop: 'city', comp: 'el-select', list: 'cityList',
            eventHandle: {
              change:(val,scope)=>this.cityChange(val,scope)
            },
            bind: { multiple: true }
          },
          {
            label: '日期', prop: 'date', type: 'date', comp: 'el-date-picker',
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
    accountFocus(event) {
      console.log('account 获取焦点事件---',event)
    },
    accountBlur(event) {
      console.log('account 失去焦点事件---',event)
    },
    accountChange(val) {
      console.log('account change事件---',val)
    },
    nameInput(val) {
      console.log('name Input事件---',val)
    },
    nameClear() {
      console.log('name 清空---')
    },
    cityChange(val) {
      console.log('city change事件----',val)
    },
    eventChange(prop, val) {
      if (prop == 'hobby') {
        console.log('hobby Value----',val)
      } else if (prop === 'sex') {
        console.log('sex value ----',val)
      }
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
