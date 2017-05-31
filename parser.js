"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phone = phone;
    this._createdAt = new Date(createdAt);
  }

  get convert() {
    return `${this._id}, ${this._firstName}, ${this._lastName}, ${this._email}, ${this._phone}, ${this._createdAt}`;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
    this.loadData();
  }

  loadData() {
    let list = fs.readFileSync(this._file, 'utf8');
    list = list.split('\n');

    for (let i = 0 ; i < list.length; i++) {
      list[i] = list[i].split(',');
    }

    for (let i = 1; i < list.length; i++) {
      let date = new Date(list[i][5]);
      //let persons = new Person(list[i][0], list[i][1], list[i][2], list[i][3], list[i][4], date);
      let strPerson = (`${list[i][0]}, ${list[i][1]}, ${list[i][2]}, ${list[i][3]}, ${list[i][4]}, ${date}`);
      this._people.push(strPerson);
    }
  }

    get people() {
      return this._people;
    }

    addPerson(peopleObj) {
      this._people.push(peopleObj.convert);
      return this._people;
    }

    saveData() {
      fs.writeFileSync(this._file, this._people.join('\n'), 'utf8');
    }
}

let parser = new PersonParser('people.csv')

let fickry = new Person('201', 'Fickry', 'Bil Iman', 'fickry.bil.iman@gmail.com', '085305670089', new Date );
parser.addPerson(fickry);
parser.saveData();

console.log(parser.people)

console.log(`There are ${parser._people.length} people in the file ${parser._file}`)
//console.log(parser.people)
