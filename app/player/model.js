const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email harus di isi'],
  },
  name: {
    type: String,
    require: [true, 'Nama harus di isi'],
    maxlength: [225, 'panjang nama harus antara 3 - 225 karakter'],
    minlength: [3, 'panjang nama harus antara 3 - 225 karakter'],
  },
  username: {
    type: String,
    require: [true, 'Username harus di isi'],
    maxlength: [225, 'panjang username harus antara 3 - 225 karakter'],
    minlength: [3, 'panjang username harus antara 3 - 225 karakter'],
  },
  password: {
    type: String,
    require: [true, 'Kata sandi harus di isi'],
    maxlength: [225, 'panjang username harus antara 3 - 225 karakter'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  avatar: { type: String },
  fileName: { type: String },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y',
  },
  phoneNumber: {
    type: String,
    require: [true, 'Nomer telephon harus di isi'],
    maxlength: [13, 'panjang nama harus antara 9 - 13 karakter'],
    minlength: [9, 'panjang nama harus antara 9 - 13 karakter'],
  },
  favorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);
