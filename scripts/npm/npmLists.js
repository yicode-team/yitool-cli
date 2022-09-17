import { padStart as _padStart, padEnd as _padEnd } from 'lodash-es';
export default [
    {
        name: `${_padEnd('npm', 12)} https://www.npmjs.org`,
        home: 'https://www.npmjs.org',
        value: 'https://registry.npmjs.org'
    },
    {
        name: `${_padEnd('taobao', 12)} https://npmmirror.com`,
        home: 'https://npmmirror.com',
        value: 'https://registry.npmmirror.com'
    },
    {
        name: `${_padEnd('yarn', 12)} https://yarnpkg.com`,
        home: 'https://yarnpkg.com',
        value: 'https://registry.yarnpkg.com'
    },
    {
        name: `${_padEnd('cnpm', 12)} https://cnpmjs.org`,
        home: 'https://cnpmjs.org',
        value: 'https://r.cnpmjs.org'
    },
    {
        name: `${_padEnd('tencent', 12)} https://mirrors.cloud.tencent.com/npm`,
        home: 'https://mirrors.cloud.tencent.com/npm/',
        value: 'https://mirrors.cloud.tencent.com/npm'
    },
    {
        name: `${_padEnd('npmMirror', 12)} https://skimdb.npmjs.com`,
        home: 'https://skimdb.npmjs.com',
        value: 'https://skimdb.npmjs.com/registry'
    }
];
