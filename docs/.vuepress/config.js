module.exports = {
    base: '/',
    title:'FUI',
    themeConfig: {
        nav: [
            // 可指定链接跳转模式：默认target: '_blank'新窗口打开，_self当前窗口打开
            { text: "gitee", link: "https://www.baidu.com" },
            { text: "CSDN", link: "https://blog.csdn.net", target: "_blank" },
            // 支持嵌套,形成下拉式的导航菜单
        ],
        sidebar: {
            '/componentDoc/': [
                {
                    title: 'form表单',
                    collapsable: false, 
                    children: [
                        'form/base','form/layout','form/validate','form/attribute'
                    ]
                },
                {
                    title: 'table表格',
                    collapsable: false, 
                    children: [
                        'table/base','table/slot','table/edit','table/clickEdit','table/validate','table/attribute'
                    ]
                },
                {
                    title: '手写实现',
                    collapsable: false, 
                    children: [
                        'utils/control'
                    ]
                },
                
            ],
            '/':['']
            
        },

    },
    chainWebpack(config) {
        config.resolve.alias.set('core-js/library/fn', 'core-js/features');
        
    },
};

