export type Constructor = { new(...args:any[]):{} };

export class BeanConfig {
  private initialConstructor: Constructor;

  constructor(initialConstructor: Constructor) {
    this.initialConstructor = initialConstructor;
  }

  newBeanInstance(): object {
    return new this.initialConstructor();
  }
}

export class FieldConfig {
  private beanName: string;
  private field: string;
  private value: any;

  constructor(beanName: string, field: string, value: any) {
    this.beanName = beanName;
    this.field = field;
    this.value = value;
  }

  getField() { return this.field; }

  getValue() { return this.value; }
}

export class PropertyConfig {
  private beanName: string;
  private property: string;
  private injectBeanName: string;

  constructor(beanName: string, property: string, injectBeanName: string) {
    this.beanName = beanName;
    this.property = property;
    this.injectBeanName = injectBeanName;
  }

  getProperty() { return this.property; }

  getInjectBeanName() { return this.injectBeanName; }
}
