"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,fName,lName,email,phone,createdAt) {
    this.id = id
    this.first_name = fName
    this.last_name = lName
    this.email = email
    this.phone = phone
    this.created_at = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    let read = fs.readFileSync(this._file, 'utf8').split('\n')
    let roster = []
    for (var i = 0; i < read.length; i++) {
      roster.push(read[i].split(','))
    }
    this._people = roster
    return this._people
  }

  addPerson(fName,lName,email,phone) {
    let d = new Date()
    this._people.push([`${+this._people[this._people.length - 1][0]+1}`,fName,lName
                      ,email,phone, d.toISOString()])
    return this._people
  }

  save() {
    if (this._people.length > 201) {
      fs.appendFileSync(this._file, '\n'+this._people[this._people.length - 1].join(','))
    } else {
      console.log('No data Added');
    }
  }
}

let parser = new PersonParser('people.csv')


parser.people
parser.addPerson('Andrew','Senewe','as31@gmail.com','081234566543')
// console.log(parser._people);
parser.save()
console.log(`There are ${parser._people.length-1} people in the file '${parser._file}'.`)

let peopleArr = []
let arr = parser._people
for (var i = 1; i < arr.length; i++) {
  let person = new Person(arr[i][0],arr[i][1],arr[i][2],arr[i][3],arr[i][4],arr[i][5])
  peopleArr.push(person)
}

// console.log(peopleArr);

