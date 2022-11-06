const mongoose = require('mongoose');

const nominalSchema = mongoose.Schema({
  cointQuantity: {
    type: Number,
    default: 0,
  },
  cointName: {
    type: String,
    require: [true, 'Nama koin harus di isi'],
  },
  price: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Nominal', nominalSchema);
