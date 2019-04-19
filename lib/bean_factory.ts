export default class BeanFactory {
  private beans: { [name: string]: object } = {};
  private beans2: { [constructorName: string]: object[] } = {};

  set(name: string, bean: object) {
    const constructorName = bean.constructor.name;
    this.beans[name] = bean;
    if (!this.beans2[constructorName])
      this.beans2[constructorName] = []
    this.beans2[constructorName].push(bean);
  }

  get(name: string): object {
    return this.beans[name];
  }

  getByConstructorName(name: string) {
    return this.beans2[name]; 
  }
}
