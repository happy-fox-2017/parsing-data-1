"use strict"
const fs = require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = (new Date(created_at)).toISOString();
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
    this.readfile();
  }

  get people() {
    return this._people;
  }

  readfile(){
    let filename = "./people.csv";
    let csv = fs.readFileSync(filename,'utf-8').trim();
    let line = csv.split("\n");
    let arrInfo = [];

    // di Array kan
    for(let i = 0; i < line.length; i++){
        arrInfo.push(line[i].split(","));
    }
    // di push ke object
    for(let j = 1; j <arrInfo.length; j++) {
        this._people.push(new Person(arrInfo[j][0], arrInfo[j][1], arrInfo[j][2], arrInfo[j][3], arrInfo[j][4], arrInfo[j][5]))
    }
  }

  addPerson(newData) {
    var Data = `\n${newData.id},${newData.first_name},${newData.last_name},${newData.email},${newData.phone},${newData.created_at}`
    this.save(Data);
  }

  save(temp){
    fs.appendFileSync(this._file,temp,"utf-8");
  }
}

let parser = new PersonParser('people.csv')
console.log(parser.people);

//Create 1 row data

parser.addPerson(new Person(201,"Antoni","Angga","antoniangga14@gmail.com","081294373359",(new Date()).toISOString()));

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
