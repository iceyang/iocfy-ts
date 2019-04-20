export interface ScanOption {
    recursive?: boolean;
    filetypes?: string[];
}
export declare function Scanner(filepath: string, option: ScanOption): void;
export default Scanner;
