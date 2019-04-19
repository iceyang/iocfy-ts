import ApplicationContext from './lib/context';
import { BeanConfig, Constructor, FieldConfig, PropertyConfig } from './lib/context';

const context = new ApplicationContext();

export function Bean(beanName?: string, fields?: {[field: string]: any}) {
  return function(constructor: Constructor) {
    const name = beanName || constructor.name;
    context.addBeanConfig(name, new BeanConfig(constructor));
    fields && Object.keys(fields).forEach(field => {
      const value = fields[field];
      const fieldConfig = new FieldConfig(name, field, value);
      context.addFieldConfig(name, fieldConfig);
    });
  };
}

export function Inject(injectBeanName?: string) {
  return function (target: any, property: string, index?: number): void {
    const beanName = target.constructor.name;
    const propertyConfig = new PropertyConfig(beanName, property, injectBeanName || property);
    context.addPropertyConfig(beanName, propertyConfig);
  };
}

export default context;
