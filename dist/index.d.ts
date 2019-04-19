import ApplicationContext from './lib/context';
import { Constructor } from './lib/context';
declare const context: ApplicationContext;
export declare function Bean(beanName?: string, fields?: {
    [field: string]: any;
}): (constructor: Constructor) => void;
export declare function Inject(injectBeanName?: string): (target: any, property: string, index?: number) => void;
export default context;
