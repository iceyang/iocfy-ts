type Constructor = { new(...args:any[]):{} };

class BeanConfig {
  initialConstructor: Constructor;
  properties: { [index: string]: string } = {};
  beans: { [index: string]: string } = {};

  constructor(initialConstructor: Constructor) {
    this.initialConstructor = initialConstructor;
  }
}

class ApplicationConfig {
  private beanConfigs: { [name: string]: BeanConfig } = {};
  
  addBeanConfig(name: string, beanConfig: BeanConfig) {
    this.beanConfigs[name] = beanConfig;
  }
}

const applicationConfig = new ApplicationConfig();

function Bean<T extends Constructor>(constructor: T) {
  const name = constructor.name;
  applicationConfig.addBeanConfig(
    name,
    new BeanConfig(constructor),
  );
}


const propertyMetadataKey = Symbol("Property");

function Inject(beanName?: string) {
  return function(target: any, setter: string, descriptor: PropertyDescriptor) {
    const property =
      beanName ? beanName : setter.replace(/set(.{1})(.*)/, (_, $2, $3) => $2.toLowerCase() + $3);
    console.log(property);
  }
  // const key = Symbol(name);
  // console.log(key);
  // return Reflect.metadata(key, name);
}

@Bean
class PersonDao {
}

@Bean
class PersonService {
  name: string;
  personDao: PersonDao;

  @Inject()
  private setPersonDao(personDao: PersonDao) { this.personDao = personDao; }
}
