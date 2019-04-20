import fs from 'fs';

function load(filepath: string) {
  const stat = fs.statSync(filepath);
  console.log(stat);
}

export interface ScanOption {
  recursive: boolean;
}

export function Scanner(path: string, option: ScanOption) {
  load(path);
}

export default Scanner;
