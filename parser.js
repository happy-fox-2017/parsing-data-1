"use strict"

let fs = require("fs");

class Person {
  constructor(id, firstName, lastName, email, phone, created) {
    this.id = id;
    this.fName = firstName;
    this.lName = lastName;
    this.email = email;
    this.phone = phone;
    this.created = created;
  }
} // end of Person ------------------------------


class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = this.people;
  }
  
  get file() {
    return this._file;
  }

  get people () {
    let data = fs.readFileSync(this._file, 'utf-8').trim();
    let lines = data.split('\n');
    
    let peopleInfo = []
    for (var i = 1; i <= lines.length - 1; i++) {
      let val = lines[i].split(',');
      peopleInfo.push(new Person(val[0], val[1], val[2], val[3], val[4], val[5]));
    }
    
    return peopleInfo;
  }
  
  addPerson(newEntry) {
    let idNum = this.people.length;
    newEntry.id = this.people.length + 1;
    let entry = `\n${newEntry.id},${newEntry.fName},${newEntry.lName},${newEntry.email},${newEntry.phone},${newEntry.created}`;
    this.save(entry);
  }
  
  save(entry) {
    fs.appendFileSync(this._file, entry, 'utf-8');
  }

} // end of PersonParser ------------------------

let parser = new PersonParser('people.csv');

parser.addPerson(new Person(11, 'orang', 'baru', 'orgbaru@email.com', '1234567890', new Date().toISOString()))

console.log(parser.people);

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
