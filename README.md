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
@Bean('userService')
class UserService {
  name: string;
  
  @Inject('UserDao')
  userDao: UserDao;

  printUser() {
    const user = this.userDao.findUser();
    console.log(user);
  }
  
  findUser(id: number) {
    return this.userDao.findUser();
  }
}

// you can assignment the normal properties.
@Bean('UserController', { limit: 20 })
class UserController {
  limit: number;
  
  @Inject('userService')
  userService: UserService;
  
  queryById() {
    return this.userService.findUser(1);
  }
}

iocfy.init();

const userService = <UserService>iocfy.get('UserService');
userService.printUser();
```

compile and run.

If you want to see the debug info, set environment `DEBUG` to `iocfy`,
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

Sometimes you may find the @Bean and @Inject are not efficient. Because in nodejs process, the decorators work until the source file is loaded.

Make sure the files which have @Bean are loaded. You can print debug info to see it.
If the beans were loaded, the debug info would like this:

```
 iocfy Init bean: UserDao. +0ms
 iocfy Init bean: UserService. +0ms
```
