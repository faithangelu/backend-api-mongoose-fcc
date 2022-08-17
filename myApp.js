let app = require('express')
require('dotenv').config();
let mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true }
).then(() => console.log("Database connected!"))
 .catch(err => console.log(err));


//create Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods : [String]
})

// create Model
const Person = mongoose.model('Person', personSchema);

// let Person;

const createAndSavePerson = (done) => {
  var personDetails = new Person({
    name: "Faith",
    age: 25,
    favoriteFoods: "female" 
  })
  
  personDetails.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
    return console.log(data);
  })
};

var arrayOfPeople =  [
  { name: "Faith", age: 25, favoriteFoods: "female"}, 
  { name: "Ivanne", age: 24, favoriteFoods: "male" }
];


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    console.log(data)
    done(null, data);  
  });  
};




const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods : food}, (err, data) => {
    if(err) return console.error(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId}, (err, data) => {
    if (err) return console.error(err);    
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({ _id: personId}, (err, data) => {
    if (err) return console.error(err);
    
    data.favoriteFoods.push(foodToAdd);
    
    data.save((err, data) => {
      if (err) return console.error(err);  
      done(null, data);
    });    
  })
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate({ name: personName }, {age: ageToSet}, {new: true}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })  
};

const removeById = (personId, done) => {
  
  Person.findByIdAndRemove({_id : personId}, (err, data) => {
    if(err) return console.error(err);
    done(null, data);
  })
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  
  Person.remove({ name: nameToRemove}, (err, data)=> {
    if (err) return console.error(err);
    done(null, data);
  })
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({ favoriteFoods: foodToSearch}).sort('name').limit(2).select('name favoriteFoods').exec((err, data) => {
    done(err, data);  
  });
  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
