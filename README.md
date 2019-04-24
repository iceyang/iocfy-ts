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
  private name: string;
  
  @Inject('UserDao') private userDao: UserDao;

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
  
  @Inject('userService') private userService: UserService;
  
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

## Scanning your beans
In most time, our project is big and the bean definitions are not in the same source file.

The source files are not really loaded when we use `import`.

To solve this, `iocfy` provides the scanner. Assuming that your source files in folder `__dirname`, you can use scanner like this:

```
// Use scan function before init.
iocfy.scan(__dirname);

iocfy.init();
```

## FAQ
### I got a undefined value when I use iocfy.get.

Sometimes you may find the @Bean and @Inject are not efficient. In nodejs process, the decorators take effect only  after the source file has been loaded.

Make sure the files which have @Bean are loaded. You can print debug info to see it.
If the beans were loaded, the debug info would like this:

```
 iocfy Init bean: UserDao. +0ms
 iocfy Init bean: UserService. +0ms
```
