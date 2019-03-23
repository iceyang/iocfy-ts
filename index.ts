import ApplicationContext from './lib/context';
import { Constructor, BeanConfig, PropertyConfig } from './lib/context';

const context = new ApplicationContext();

export function Bean(beanName?: string) {
  return function(constructor: Constructor) {
    const name = beanName || constructor.name;
    context.addBeanConfig(
      name,
      new BeanConfig(constructor),
    );
  };
}

export function Inject(injectBeanName?: string) {
  return function (target: any, property: string, index?: number): void {
    const beanName = target.constructor.name;
    context.addPropertyConfig(
      beanName,
      new PropertyConfig(
        beanName,
        property,
        injectBeanName || property),
    );
  };
}

export default context;
