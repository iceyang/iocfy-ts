import iocfy from '../';
import { Bean, Inject } from '../';

// by default, the bean's name is the class name. 
@Bean()
class UserDao {
  private name: string;

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
@Bean('userService')
@Bean('userService2', {name: 'a-user-service'})
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
console.log(userService.name);

const userService1 = <UserService>iocfy.get('userService');
console.log(userService1.name);

const userService2 = <UserService>iocfy.get('userService2');
console.log(userService2.name);
