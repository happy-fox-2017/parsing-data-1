"use strict"
let fs = require('fs');
let csv = require('fast-csv');

class Person {
  // Look at the above CSV file
  constructor(id, first_name, last_name, email, phone){
  // What attributes should a Person object have?
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = (new Date()).toISOString();
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get file(){
    return this._file;
  }

  get people() {
    let readData = fs.readFileSync(this._file, 'utf8').trim(); // buat variable untuk menampung file yang akan kita baca
    // console.log(readData);
    let editData = readData.split(/[,\n]+/g); // buat variable untuk menampung file yang sudah kita olah (split tiap ada ',' jadi line break) agar data jadi array
    // console.log(editData);
    let fileData = []; // buat variable penampung array of object

    // akses data csv yang sudah di pecah jadi array dengan looping
    for(let i=0; i<editData.length; i+=6){
      let person = new Person(); // buat object untuk menampung data array
      person.id         = editData[i];
      person.first_name = editData[i+1];
      person.last_name  = editData[i+2];
      person.email      = editData[i+3];
      person.phone      = editData[i+4];
      person.created_at = new Date(editData[i+5]);
      fileData.push(person);
    }

    return this._people = fileData;
    // console.log(fileData);
  }

  addPerson(newData) {
    let addNewPerson = `\n${newData.id},${newData.first_name},${newData.last_name},${newData.email},${newData.phone},${newData.created_at}`;
    console.log(newData);
    this.save(addNewPerson);
  }

  save(data){
    fs.appendFileSync(this._file, data,'utf8');
  }

}

let parser = new PersonParser('people.csv');
let data = parser.people;
// console.log(data);

parser.addPerson(new Person(201,'ade','anugerah','ade_anugerahtb@yahoo.com','1-633-389-7173'));

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
