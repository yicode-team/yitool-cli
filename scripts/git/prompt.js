// 模块导入
import path from 'path';
import { merge as _merge } from 'lodash-es';
import fs from 'fs-extra';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { fileURLToPath } from 'url';

// yicode相关

import { statistics } from './statistics.js';

// 提示参数收集
let promptParams = {
    // 执行命令
    executeCommand: 'statistics'
};

async function prompt() {
    const _executeCommand = await inquirer.prompt([
        {
            type: 'list',
            name: 'executeCommand',
            message: '请选择一个命令',
            loop: false,
            default: promptParams.executeCommand,
            choices: [
                {
                    name: '数据统计',
                    value: 'statistics',
                    describe: '数据提交统计'
                }
            ]
        }
    ]);

    _merge(promptParams, _executeCommand);

    if (promptParams.executeCommand === 'statistics') {
        await statistics(promptParams);
    }
}

export { prompt };
