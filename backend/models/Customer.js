const User = require('./User')
class Customer extends User {
// class Customer{
  constructor(age, name) {
    super(age);
    // this._age = age;
    this._name = name;
  }
  present() {
    return 'I am ' + this._name + ' and  I am ' + this._age + ' years old!';
  }
}

module.exports = Customer;
