// Classes
import { User } from './user.model';

describe('User', () => {
  let userInstance: User = new User('', '', '', new Date());

  it(`should be created`, () => {
    expect(userInstance).toBeTruthy();
  });

  it(`should get the private '_token' value if the expiration date has not been exceeded`, () => {
    userInstance = new User('test email', 'test id', 'test token', new Date(new Date().getTime() + 100000));
    expect(userInstance.token).toEqual('test token');
  })

  it(`should get 'null' for the private '_token' value if the expiration date has passed`, () => {
    userInstance = new User('test email', 'test id', 'test token', new Date(new Date().getTime() - 100000));
    expect(userInstance.token).toEqual(null);
  })

  it(`should get 'null' for the private '_token' value if there is no expiration date`, () => {
    userInstance = new User('test email', 'test id', 'test token', null);
    expect(userInstance.token).toEqual(null);
  })
});