Simple IoC implementation of TypeScript.

## Installation

```bash
$ npm i -S iocfy-ts
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

const userService = <UserService>iocfy.get('UserService');
userService.printUser();
```

compile and run.

iocfy can print the debug info, to enable it, set envrionment `DEBUG` with value `iocfy`,
eg:

```
$ export DEBUG=iocfy
$ node index.js
```

or

```
$ DEBUG=iocfy node index.js
```

## FAQ
### I got a undefined value When I use iocfy.get.

Make sure the files which have @Bean are loaded. You can print debug info to see it.
If the beans were loaded, the debug info would like this:

```
$ iocfy Init bean: UserDao. +0ms
$ iocfy Init bean: UserService. +0ms
```
