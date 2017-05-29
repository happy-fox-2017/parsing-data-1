"use strict"

let fs = require('fs')

class Person {
  //id,first_name,last_name,email,phone,created_at
  constructor(id,fName,lName,email,phone,created) {
    this.id = id
    this.first_name = fName
    this.last_name = lName
    this.email = email
    this.phone = phone
    this.created_at = new Date(created).toISOString()
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.parseToObj()
    this._csv = null
  }

  get people() {
    return this._people
  }

  set people(people) {
    this._people = people
  }

  get file() {
    return this._file
  }

  get csv(){
    return this._csv
  }

  set csv(str) {
    this._csv = str
  }

  addPerson(personObj) {
    this.people.push(personObj)
  }

  parseToObj () {
    let file = this.file
    let files = fs.readFileSync(file, 'utf8')
    let lines = files.split('\n')
    let people = []
    for (let i = 1; i < lines.length; i++) {
      let line = lines[i]
      let info = line.split(',')
      people.push(new Person(info[0], info[1],info[2],info[3],info[4],info[5]))
    }
    return people;
  }

  save() {
    let columns = 'id,first_name,last_name,email,phone,created_at\n'
    let file = this.file
    let people = this.people
    let keys = Object.keys(people[0])
    let lines = ''
    for (let i = 0; i < people.length; i++) {
      let lineTemp = []
      for (let j = 0; j < keys.length; j++) {
        let key = keys[j]
        lineTemp.push(`${people[i][key]}`)
      }
      if (i == people.length - 1) {
        lines += lineTemp.join(',')
      } else {
        lines += lineTemp.join(',') + `\n`
      }
    }
    let result = columns + lines
    this.csv = result
    fs.writeFileSync(file, this.csv)
  }
}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person('301','somad','haha','karim@gmail.com','1-369-893-7454', new Date().toISOString()))
parser.save()

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
