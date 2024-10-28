import FTable from "./FTable";
import FForm from "./FForm";
const components=[FTable,FForm]
const install = (Vue) => {
    //判断是否安装
    if (install.installed) return
    install.installed = true
    // 遍历注册全局组件
   components.map(comp => Vue.component(comp.name, comp))
}

export {
    FTable,
    FForm
}
export default{
 install
}