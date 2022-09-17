import { resolve as path_resolve } from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ini from 'ini';
import fs from 'fs-extra';
import logSymbols from 'log-symbols';
import ora from 'ora';
import Downloader from 'nodejs-file-downloader';
import AdmZip from 'adm-zip';
import { merge as _merge, last as _last, keyBy as _keyBy } from 'lodash-es';

import { templateLists } from './templateLists.js';
import { rootDir, tempDir } from '../../system.js';

// 提示参数收集
let promptParams = {};

// 下载项目
function downloadProject(options) {
    const spinner = ora('Loading unicorns').start('模板下载中');
    return new Promise(async (resolve, reject) => {
        try {
            const downloader = new Downloader({
                url: options.url,
                directory: tempDir,
                fileName: _last(options.url.split('/')),
                cloneFiles: false,
                maxAttempts: 3,
                onProgress: function (percentage, chunk, remainingSize) {
                    if (remainingSize === 0) {
                        spinner.succeed('下载成功');
                    }
                }
            });
            let res = await downloader.download();
            resolve(res);
        } catch (err) {
            spinner.fail('下载失败');
            reject(err);
        }
    });
}

export async function prompt(options) {
    promptParams = _merge(promptParams, options);

    if (fs.readdirSync(rootDir).length > 0) {
        console.log(`${logSymbols.error} ${chalk.red('当前目录不为空，请使用空目录下载')}`);
        return;
    }

    // 提示使用的环境变量文件
    let _executeCommand = await inquirer.prompt([
        {
            type: 'list',
            name: 'templateName',
            message: '请选择要下载的模板',
            choices: templateLists
        }
    ]);
    promptParams = _merge(promptParams, _executeCommand);

    let projectItem = _keyBy(templateLists, 'value')[promptParams.templateName];

    await downloadProject(projectItem);

    // 创建zip压缩实例
    let zip = new AdmZip(path_resolve(tempDir, projectItem.fileName));
    await zip.extractAllTo(rootDir, true);

    // 移除临时目录
    fs.removeSync(tempDir);
}
