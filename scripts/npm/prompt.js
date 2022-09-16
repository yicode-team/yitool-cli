import chalk from 'chalk';
import inquirer from 'inquirer';
import ini from 'ini';
import fs from 'fs-extra';
import { merge as _merge } from 'lodash-es';

import npmLists from './npmLists.js';
import { npmrc } from '../system.js';

// 提示参数收集
let promptParams = {};

export async function prompt(options) {
    promptParams = _merge(promptParams, options);

    // 提示使用的环境变量文件
    let _executeCommand = await inquirer.prompt([
        {
            type: 'list',
            name: 'executeCommand',
            message: '请选择要执行的命令',
            choices: [
                {
                    name: 'current' + chalk.cyanBright('  显示当前npm源'),
                    value: 'current'
                },
                {
                    name: 'list' + chalk.cyanBright('  显示所有npm源'),
                    value: 'list'
                }
            ]
        }
    ]);
    promptParams = _merge(promptParams, _executeCommand);

    if (promptParams.executeCommand === 'list') {
        let _npmMirror = await inquirer.prompt([
            {
                type: 'list',
                name: 'npmMirror',
                message: '请选择要切换的NPM镜像',
                choices: npmLists
            }
        ]);
        promptParams = _merge(promptParams, _npmMirror);

        fs.ensureFileSync(npmrc);
        let fileData = fs.readFileSync(npmrc, 'utf-8');
        let fileConfig = ini.parse(fileData);
        fileConfig.registry = promptParams.npmMirror;
        fs.writeFileSync(npmrc, ini.stringify(fileConfig));
        console.log('当前仓库地址' + chalk.cyanBright(`  ${fileConfig.registry}`));
    }

    if (promptParams.executeCommand === 'current') {
        fs.ensureFileSync(npmrc);
        let fileData = fs.readFileSync(npmrc, 'utf-8');
        let fileConfig = ini.parse(fileData);
        console.log('当前仓库地址' + chalk.cyanBright(`  ${fileConfig.registry}`));
    }
}
