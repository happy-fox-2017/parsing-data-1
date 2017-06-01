"use strict"
let fs = require('fs');

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.phone = phone;
    this.createdAt = new Date(created_at);
  }

  get insert() {
    return `${this.id}, ${this.firstName}, ${this.lastName}, ${this.email}, ${this.phone}, ${this.createdAt}`;
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = [];
  }
  
  get people() {
    //split csv by enter
    let isiData = fs.readFileSync(this._file, 'utf8').trim().split('\n');
    
    //split csv by comma
    for (let i = 0 ; i < isiData.length; i++) {
      isiData[i] = isiData[i].split(',');
    }
    
    //started by row data
    for (let i = 2; i < isiData.length; i++) {
      let date = new Date(isiData[i][5]);
      let persons = new Person(isiData[i][0], isiData[i][1], isiData[i][2], isiData[i][3], isiData[i][4], date);
      this._people.push(persons);
    }
    return this._people;
  }
  
  //method to add an object to arr temporary
  addPerson(addObj) {
    this._people.push(addObj.insert);
    return this._people;
  }

  save() {
    fs.appendFileSync(this._file, this._people + ('\n'), 'utf8');
  }
}

let parser = new PersonParser('people.csv')

let addOther = new Person('201', 'Aminuddin', 'Wicaksono', 'amin.wicak@gmail.com', '081208120812', (new Date ));
parser.addPerson(addOther);
parser.save();

console.log(parser.people)
console.log(`There are ${parser._people.length} people in the file ${parser._file}`)
