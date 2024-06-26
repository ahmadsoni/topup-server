const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama game harus di isi'],
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y',
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  nominals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nominal',
  }],
  payment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Voucher', voucherSchema);
