"use strict"

var fs = require('fs'); //taroh paling atas file. Best practice

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this._id = id;
    this._fName = firstName;
    this._lName = lastName;
    this._email = email;
    this._phone = phone;
    this.createdAt = (new Date(createdAt)).toUTCString();
  }
}//class

class PersonParser {//Bagian untuk parsing csv jadi data yg bisa diolah pake javascript
  constructor(file) {
    this._file = file;
    this._rawData = this.dataArray();
    this._people = this.peopleAssigned();
  }

  get people() {
    return this._people;
  }
  
  get file() {
    return this._file;
  }
  
  dataArray() {//Buat csv jadi array
    let csv = fs.readFileSync(this._file, 'utf-8');
    let dataArray = csv.split('\n');
    for (let i = 0; i < dataArray.length; i++) {
      dataArray[i] = dataArray[i].split(',');
    }
    return dataArray;
  }
  
  peopleAssigned() {//Buat data array, jadi object array
    let arrObj = [];
    let raw = this._rawData;
    
    for(let i = 1; i < this._rawData.length; i++) {
      arrObj[i - 1] = new Person(raw[i][0], raw[i][1], raw[i][2], raw[i][3], raw[i][4], raw[i][5]);
    }
    return arrObj;
  }
  
  addPerson(objectAssigned) {//Nambah data baru ke object array di peopleAssigned()
    this._people.push(objectAssigned);
    
    this.save(objectAssigned);
  }
  
  save(objectAssigned){//ngesave data yang udah ditambah jadi csv lagi.
    // let obj = objectAssigned;
    let string = `\n${objectAssigned._id},${objectAssigned._fName},${objectAssigned._lName},${objectAssigned._email},${objectAssigned._phone},${objectAssigned.createdAt}`;
    let fs = require('fs');
    fs.appendFileSync(this._file, string, 'utf-8');
  }
  
  
}//class

let parser = new PersonParser('people.csv')

console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)
console.log(parser.people[200])

parser.addPerson(new Person(201, 'Adith', 'Widya Pradipta', 'adith@gmail.com', '1-790-530-3141', '20 September 1992'))
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
// console.log(parser.people[202].email)

// console.log(parser.dataArray());
