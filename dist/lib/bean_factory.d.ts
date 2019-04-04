export default class BeanFactory {
    private beans;
    set(name: string, bean: object): void;
    get(name: string): object;
}
