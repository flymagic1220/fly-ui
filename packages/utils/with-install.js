export const  withInstall=(comp) =>{
    comp.install = function (Vue) {
        Vue.component(comp.name,comp)
    }
    return comp
}