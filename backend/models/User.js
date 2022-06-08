class User {
  constructor(age) {
    this._age = age;
  }
  saySth() {
    return 'I am ' + this._age + ' years old!';
  }
}

module.exports = User;