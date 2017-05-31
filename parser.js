"use strict"

const fs = require('fs');
const csv = require('csv');
// const csvParser = csv.parse();

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.createdAt = new Date(createdAt);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  parseFile(onDataLoaded) {
    const data = fs.readFileSync(this._file).toString();
    csv.parse(data, { comment: '#' }, (err, output) => {
      for (let i = 1; i < output.length; i += 1) {
        const newPerson = new Person(
          output[i][0],
          output[i][1],
          output[i][2],
          output[i][3],
          output[i][4],
          output[i][5]);
        this._people.push(newPerson);
      }
      onDataLoaded();
    });
  }

  get people() {
    return this._people;
  }

  get file() {
    return this._file;
  }

  addPerson(person) {
    this._people.push(person);
  }

  save() {
    csv.transform(this._people, person => `${person.id},${person.firstName},${person.lastName},${person.email},${person.phone},${person.createdAt}\n`,
    (err, output) => {
      output.splice(0, 0, 'id,first_name,last_name,email,phone,created_at\n');
      fs.writeFile(this._file, output.join(''), (fileErr) => {
        if (fileErr) throw fileErr;
        console.log('Saved!');
      });
    });
  }

}

const parser = new PersonParser('people.csv');
const onDataLoaded = () => {
  console.log(parser.people);
  console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);
  const newPerson = new Person(335, 'Muhammad', 'Yusuf', 'myyusuf1911@gmail.com', '08XXXXXXXX', new Date());
  parser.addPerson(newPerson);
  parser.save();
};
parser.parseFile(onDataLoaded);

