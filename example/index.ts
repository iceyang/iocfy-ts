import iocfy from 'iocfy-ts';
import { Bean, Inject } from 'iocfy-ts';

@Bean()
class UserDao {
  findUser() {
    return { name: 'Justin', sex: 'male', };
  }
}

@Bean()
class UserService {
  name: string;
  
  @Inject('UserDao')
  userDao: UserDao;

  printUser() {
    const user = this.userDao.findUser();
    console.log(user);
  }
}

iocfy.init();

const userService = <UserService>iocfy.beanFactory.get('UserService');
userService.printUser();
