const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'nama kategory harus di isi'],
  },
},{timestamps: true});

module.exports = mongoose.model('Category', categorySchema);
