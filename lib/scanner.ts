import fs from 'fs';
import DEBUG from 'debug';

const debug = DEBUG('iocfy:scanner');

function load(filepath: string) {
  if (!fs.existsSync(filepath)) {
    throw new Error(`filepath ${filepath} is not exists`);
  }
  const stat = fs.statSync(filepath);
  debug('isFile: ', stat.isFile());
  debug('isDirectory: ', stat.isDirectory());
}

export interface ScanOption {
  recursive: boolean;
}

export function Scanner(path: string, option: ScanOption) {
  load(path);
}

export default Scanner;
