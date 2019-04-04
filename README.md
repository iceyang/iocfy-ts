Typescript简单版本的IoC

## Installation

```bash
$ npm i -s iocfy-ts
```

## Getting Started

```ts
import iocfy from 'iocfy-ts';
import { Bean, Inject } from 'iocfy-ts';

// by default, the bean's name is the class name. 
@Bean()
class UserDao {
  findUser() {
    return { name: 'Justin', sex: 'male', };
  }
}

// or you can specify the bean name.
@Bean('otherService')
class OtherService {
  doSomeThing() {
  }
}

@Bean()
class UserService {
  name: string;
  
  @Inject('UserDao')
  userDao: UserDao;

  @Inject('otherService')
  otherService: OtherService;

  printUser() {
    const user = this.userDao.findUser();
    console.log(user);
  }
}

iocfy.init();

const userService = <UserService>iocfy.beanFactory.get('UserService');
userService.printUser();
```
