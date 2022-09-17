import { padStart as _padStart, padEnd as _padEnd, last as _last } from 'lodash-es';
let _templateLists = [
    {
        name: '基础模板',
        value: 'vue2-base-webpack',
        describe: '通用Vue2基础项目模板',
        url: 'https://static.chensuiyi.com/download/yicode-template-vue2-base-webpack.zip'
    },
    {
        name: '基础模板',
        value: 'vue3-base-vite',
        describe: '通用Vue3基础项目模板',
        url: 'https://static.chensuiyi.com/download/yicode-template-vue3-base-vite.zip'
    },
    {
        name: '后台模板',
        value: 'vue2-admin-webpack',
        describe: '通用Vue2后台项目模板',
        url: 'https://static.chensuiyi.com/download/yicode-template-vue2-admin-webpack.zip'
    },
    {
        name: '接口模板',
        value: 'yiapi-template-free',
        describe: '通用免费yiapi接口开发模板',
        url: 'https://static.chensuiyi.com/download/yiapi-template-free.zip'
    }
];

let templateLists = _templateLists.map((item) => {
    item.name = `${_padEnd(item.name, 10)} (${item.value})`;
    item.fileName = _last(item.url.split('/'));
    return item;
});

export { templateLists };
