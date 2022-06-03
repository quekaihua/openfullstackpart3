const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const getId = () => {
  return Math.floor(Math.random() * Math.pow(2, 30))
}

const password = process.argv[2]

const url = `mongodb+srv://root:${password}@cluster0.puvpf.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personScheme = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personScheme)

if (process.argv.length === 3) {
  Person.find({}).then((res) => {
    console.log('phonebook:')
    res.forEach((person) => {
      console.log(person.name, ' ', person.number)
    })

    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const id = getId()

  const person = new Person({
    name,
    number,
    id,
  })

  person.save().then(() => {
    console.log(`add ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
