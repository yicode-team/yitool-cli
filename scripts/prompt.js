// 模块导入
import path from 'path';
import { merge as _merge, padEnd as _padEnd } from 'lodash-es';
import fs from 'fs-extra';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { fileURLToPath, pathToFileURL } from 'url';

import { cliDir } from '../system.js';

// 提示参数收集
let promptParams = {
    // 执行命令
    executeCommand: ''
};

/**
 * 选择要执行的命令
 */
async function executeCommand() {
    let choices = [
        {
            name: `${_padEnd('git', 12)} ${chalk.cyanBright('git提交数据可视化')}`,
            value: 'git'
        },
        {
            name: `${_padEnd('npm', 12)} ${chalk.cyanBright('切换npm源地址')}`,
            value: 'npm'
        },
        {
            name: `${_padEnd('template', 12)} ${chalk.cyanBright('下载项目模板')}`,
            value: 'template'
        },
        {
            name: `${_padEnd('zip', 12)} ${chalk.cyanBright('创建压缩包')}`,
            value: 'zip'
        },
        {
            name: `${_padEnd('version', 12)} ${chalk.cyanBright('查看版本信息')}`,
            value: 'version'
        }
    ];

    let _executeCommand = await inquirer.prompt([
        {
            type: 'list',
            name: 'executeCommand',
            message: '请选择一个命令',
            default: promptParams.executeCommand,
            choices: choices
        }
    ]);
    _merge(promptParams, _executeCommand);
    // 命令执行路径
    let commandPath = pathToFileURL(path.resolve(cliDir, 'scripts', promptParams.executeCommand, 'prompt.js'));
    let { prompt } = await import(commandPath.href);
    await prompt();
}

export default executeCommand;
