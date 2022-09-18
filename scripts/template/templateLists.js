import { padStart as _padStart, padEnd as _padEnd, last as _last } from 'lodash-es';
let _templateLists = [
    {
        name: '基础模板',
        value: 'yibase-vue2',
        describe: '通用Vue2基础项目模板',
        url: 'https://static.chensuiyi.com/download/yibase-vue2.zip'
    },
    {
        name: '基础模板',
        value: 'yibase-vue3',
        describe: '通用Vue3基础项目模板',
        url: 'https://static.chensuiyi.com/download/yibase-vue3.zip'
    },
    {
        name: '后台模板',
        value: 'yiadmin-vue2',
        describe: '通用Vue2后台项目模板',
        url: 'https://static.chensuiyi.com/download/yiadmin-vue2.zip'
    },
    {
        name: '接口模板',
        value: 'yiapi-free',
        describe: '通用免费yiapi接口开发模板',
        url: 'https://static.chensuiyi.com/download/yiapi-free.zip'
    },
    {
        name: 'uniapp模板',
        value: 'yiuni-vue2',
        describe: '通用uniap + vue2基础项目模板',
        url: 'https://static.chensuiyi.com/download/yiuni-vue2.zip'
    }
];

let templateLists = _templateLists.map((item) => {
    item.name = `${_padEnd(item.name, 10)} (${item.value})`;
    item.fileName = _last(item.url.split('/'));
    return item;
});

export { templateLists };
