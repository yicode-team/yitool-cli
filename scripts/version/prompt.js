import chalk from 'chalk';
import fs from 'fs-extra';
import { resolve as path_resolve } from 'path';
import { merge as _merge } from 'lodash-es';
import { cliDir } from '../../system.js';

let packageConfig = fs.readJSONSync(path_resolve(cliDir, 'package.json'), { throws: false }) || {};

// 提示参数收集
let promptParams = {};

export async function prompt(options) {
    // 合并参数
    promptParams = _merge(promptParams, options);
    console.log('yitool-cli版本：' + chalk.blue(`${packageConfig.version}`));
}
