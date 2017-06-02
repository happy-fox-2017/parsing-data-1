"use strict"

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    console.log(createdAt)
    if (createdAt== undefined){
      this.createdAt = new Date().toISOString();
    }else{
    this.createdAt = (new Date(createdAt)).toISOString();
  }
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._dataMentah = this.arrayOfData();
    this._people = this.assignPeople();
  }

  arrayOfData() {
    let fs = require("fs");

    let csv = (fs.readFileSync(this._file, "utf-8")).trim();
    let arrayOfData = csv.split("\n")
    for(let i = 0; i < arrayOfData.length; i++) {
      arrayOfData[i] = arrayOfData[i].split(',')
    }
    return arrayOfData;
  }

  assignPeople() {
    let arr = [];

    for(let i = 1; i < this._dataMentah.length; i++) {
      arr[i - 1] = new Person(this._dataMentah[i][0], this._dataMentah[i][1], this._dataMentah[i][2], this._dataMentah[i][3], this._dataMentah[i][4], this._dataMentah[i][5])
    }
    return arr;
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }

  addPerson(assignObject) {
    this._people.push(assignObject);

    this.save(assignObject);
  }

  save(assignObject) {
    let string = `${assignObject.id},${assignObject.firstName},${assignObject.lastName},${assignObject.email},${assignObject.phone},${assignObject.createdAt}`;

    let fs = require("fs");
    fs.appendFileSync(this._file, string, "utf-8")
  }
}

let parser = new PersonParser('people.csv')


console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
console.log(parser.people[0])

parser.addPerson(new Person(202, 'Abdul gani', 'Rusli', 'rusli.gani88@gmail.com', '1-703-520-4121', '24 Januari 1988'))
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
//console.log(parser.people[204].email)
