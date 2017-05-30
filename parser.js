"use strict"
 var fs = require('fs');

class Person  {
	constructor(data) {
 		this.dataArr = data.split(",");
 		this.attr = {};
 		this.attr['id'] = this.dataArr[0];
 		this.attr['first_name'] = this.dataArr[1];
 		this.attr['last_name'] = this.dataArr[2];
 		this.attr['email'] = this.dataArr[3];
 		this.attr['phone'] = this.dataArr[4];
 		//console.log(this.dataArr[5]);
 		if (this.dataArr[5]) {
 		 	this.attr['created_at'] = new Date(this.dataArr[5]);
 		} else {
 		 	this.attr['created_at'] = new Date();
 		 }
 		 //this.attr['created_at'] = new Date(this.dataArr[5]);
	}
}

class PersonParser { 	
  constructor(file) {
    this._file = file;
    this._people = [];
    this.dataArr = this.callFile();
    this.peopleAttr();
  }

peopleAttr() {
	for ( let i =1; i < this.dataArr.length; i++) {
		let allPeople = new Person(this.dataArr[i]);
		this._people.push(allPeople.attr);
	}
}

callFile() {
    var data = fs.readFileSync('people.csv', 'utf-8')
      .toString()
      .split("\n");
    return data;
  }

addPerson(nPerson) {
	this._people.push(nPerson.attr);
	this.save(nPerson);
}

save(nPerson) {
	let newLine = "\n";
 	for(var x in nPerson.attr) {
		if(x === "created_at") {
			newLine += nPerson.attr[x].toISOString();
		}
		else {
			newLine += nPerson.attr[x] + ',';
		}
	}
    fs.appendFileSync('people.csv',newLine);
}

	get people() {
   		return this._people
	}
}

let parser = new PersonParser('people.csv')
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
 parser.addPerson(new Person('201,Kokoh,Tanamal,email@kokoh.com,1-633-389-7173'));
 console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`);