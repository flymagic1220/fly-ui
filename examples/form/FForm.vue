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
