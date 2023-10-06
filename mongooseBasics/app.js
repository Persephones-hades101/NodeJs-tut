const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

const fruitsSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  rating:{
    type:Number,
    min:1,
    max:10
  },
  review: String
})

const Fruit = mongoose.model("Fruit", fruitsSchema);

const fruit = new Fruit({
  name: "SweetLime",
  rating: 7.5,
  review: "good fruit"
})

fruit.save();

const personSchema=new mongoose.Schema({
  age: Number,
  name:String,
  favFruit:fruitsSchema
})



const Person=mongoose.model("Person",personSchema);

const person=new Person({
  age:19,
  name:"Jack",
  favFruit:fruit
})

person.save();



async function fetchFruits() {
  try {
    const fruits = await Fruit.find({});
    fruits.forEach(fruit=>{
      console.log(fruit.name);
    })
  } catch (error) {
    console.error(error);
  }
  // mongoose.connection.close();
}

async function deletePeople()
{
  try{
    const res= await Person.deleteMany({name:"Sudhanshu"});
  }
  catch(err)
  {
    console.log(err);
  }
  mongoose.connection.close();
}

// fetchFruits();
// deletePeople();
