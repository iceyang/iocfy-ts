export default class BeanFactory {
  private beans: { [name: string]: object } = {};

  set(name: string, bean: object) {
    this.beans[name] = bean;
  }

  get(name: string): object {
    return this.beans[name];
  }
}
