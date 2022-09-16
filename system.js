import { join as path_join, dirname as path_dirname } from 'path';
import { fileURLToPath } from 'url';
// yicode命令路径
export const cliDir = path_dirname(fileURLToPath(import.meta.url));

// 项目根目录路径
export const rootDir = process.cwd();

// NPM 镜像列表
export const yicodeNpmrc = path_join(process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'], '.yicode-npmrc');

// NPM 配置地址
export const npmrc = path_join(process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'], '.npmrc');
