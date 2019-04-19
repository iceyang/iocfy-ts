export default class BeanFactory {
    private beans;
    private beans2;
    set(name: string, bean: object): void;
    get(name: string): object;
    getByConstructorName(name: string): object[];
}
