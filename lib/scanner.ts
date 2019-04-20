import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import DEBUG from 'debug';

const debug = DEBUG('iocfy:scanner');

function isTargerFileType(filepath: string, filetypes: string[]) {
  const splits = filepath.split('.');
  const isTarget = filetypes.reduce((isTarget, filetype) => {
    const filetypeSplit = filetype.split('.');
    const match = _.isEqual(
      splits.slice(splits.length - filetypeSplit.length, splits.length),
      filetypeSplit
    );
    return isTarget || match;
  }, false);

  return isTarget;
}

function load(filepath: string, option: ScanOption) {
  const stat = fs.statSync(filepath);
  if (stat.isFile() && isTargerFileType(filepath, option.filetypes)) {
    debug(`load file: ${filepath}`);
  //  require(filepath);
    return;
  }
  if (!option.recursive) return;
  if (stat.isDirectory()) {
    const files = fs.readdirSync(filepath);

    files.forEach(filename => {
      load(path.normalize(filepath + '/' + filename), option);
    });
  }
}

export interface ScanOption {
  recursive?: boolean;
  filetypes?: string[];
}

export function Scanner(filepath: string, option: ScanOption) {
  if (!fs.existsSync(filepath)) {
    throw new Error(`filepath ${filepath} is not exists`);
  }
  load(filepath, option);
}

export default Scanner;
