const mongoose = require('mongoose')
let categorySchema = mongoose.Schema({
    name: {
      type: String,
     require: [true, 'nama kategory harus di isi']  
    }   
})

module.exports = mongoose.model('Category', categorySchema)