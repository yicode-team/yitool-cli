import chalk from 'chalk';
import fs from 'fs-extra';
import AdmZip from 'adm-zip';
import archiver from 'archiver';
import fg from 'fast-glob';
import ora from 'ora';
import logSymbols from 'log-symbols';
import { resolve as path_resolve } from 'path';
import { pathToFileURL } from 'url';

import { merge as _merge, isArray as _isArray, isString as _isString } from 'lodash-es';

import { cliDir, rootDir } from '../../system.js';

let packageConfig = fs.readJSONSync(path_resolve(cliDir, 'package.json'), { throws: false }) || {};

// 提示参数收集
let promptParams = {};

export async function prompt(options) {
    try {
        // 合并参数
        promptParams = _merge(promptParams, options);
        let yitoolConfigPath = path_resolve(rootDir, 'yitool.config.json');
        fs.ensureFileSync(yitoolConfigPath);
        let yitoolConfigData = fs.readJSONSync(yitoolConfigPath);

        if (_isArray(yitoolConfigData.zip.include) === false) {
            console.log(`${logSymbols.error} ${chalk.red('zip.include必须为数组')}`);
            return;
        }
        if (_isArray(yitoolConfigData.zip.exclude) === false) {
            console.log(`${logSymbols.error} ${chalk.red('zip.exclude必须为数组')}`);
            return;
        }

        if (_isString(yitoolConfigData.zip.savePath) === false) {
            console.log(`${logSymbols.error} ${chalk.red('zip.savePath保存路径必须为字符串')}`);
            return;
        }

        let spinner = ora('Loading unicorns').start('资源压缩中...');

        let zipFilePath = path_resolve(rootDir, yitoolConfigData.zip.savePath, yitoolConfigData.zip.zipName);

        fs.removeSync(zipFilePath);

        const output = fs.createWriteStream(zipFilePath);

        const archive = archiver('zip', {
            zlib: {
                level: 6
            }
        });

        archive.pipe(output);

        archive.glob(yitoolConfigData.zip.include, {
            //
            cwd: rootDir,
            dot: true,
            nodir: true,
            ignore: [...yitoolConfigData.zip.exclude, yitoolConfigData.zip.zipName]
        });

        await archive.finalize();

        spinner.succeed('资源压缩成功！');
    } catch (err) {
        console.log('🚀 ~ file: prompt.js ~ line 70 ~ prompt ~ err', err);
        spinner.fail('资源压缩失败！');
    }

    // console.log(`${logSymbols.success} ${chalk.red('创建压缩包成功!')}`);
}
