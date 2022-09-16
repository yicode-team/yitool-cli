// 模块导入
import path from 'path';
import { merge as _merge } from 'lodash-es';
import fs from 'fs-extra';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { fileURLToPath, pathToFileURL } from 'url';

import { cliDir } from '../system.js';
console.log('🚀 ~ file: prompt.js ~ line 10 ~ cliDir', cliDir);

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
            name: 'git' + chalk.cyanBright('  git提交数据可视化'),
            value: 'git'
        },
        {
            name: 'npm' + chalk.cyanBright('  切换npm源地址'),
            value: 'npm'
        },
        {
            name: 'version' + chalk.cyanBright('  查看版本信息'),
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
    console.log('🚀 ~ file: prompt.js ~ line 48 ~ executeCommand ~ commandPath', commandPath);
    let { prompt } = await import(commandPath.href);
    await prompt();
}

export default executeCommand;
