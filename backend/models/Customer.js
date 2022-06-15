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
  showData() {
    const tbname = 'tmp';
    const field = 'count(*)';
    this.getData(tbname, field, (er, re) => {
      if (er) console.log(er);
      else {
        if (re[1].command === 'SELECT')
          console.log(re[1].result);
        else
          console.log(re[1]);
      }
    });
  }
}

module.exports = Customer;

let cus = new Customer(20, 'Luc');
cus.showData();
cus.showData();
cus.showData();
cus.showData();
