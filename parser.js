"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    if(created_at === undefined){
      this.created_at = new Date();
    } else {
      this.created_at = new Date(created_at);
    }
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    if(this._people) {
      return this._people;
    }
  }

  parserFile() {
    this._people =[];
    let data = fs.readFileSync(this._file,'utf8').split("\n");
    for(let i = 1 ; i < data.length ; i ++) {
      let dataSplit = data[i].split(',');
      this._people.push(new Person(dataSplit[0],dataSplit[1],dataSplit[2],dataSplit[3],dataSplit[4],dataSplit[5]));
    }
    //console.log(this._people);
    return this._people;
  }

  addPerson(first_name,last_name,email,phone) {
    this._people.push(new Person(this._people.length+1,first_name,last_name,email,phone));
  }

  save(){
    let newPeople =[];
    for(let i = 0 ; i < this._people.length ; i ++) {
      newPeople.push(`${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at.toISOString()}`);
    }
    let dataCSV = "id,first_name,last_name,email,phone,created_at\n"
    dataCSV += newPeople.join("\n");
    fs.writeFile('people2.csv',dataCSV, 'utf8', function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('Data berhasil di save');
      }
    })
  }
}

let parser = new PersonParser('people.csv');
parser.parserFile();
parser.addPerson('jumadi','akhmad','jumadi@gmail.com', '081232313');
parser.save();
//console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
