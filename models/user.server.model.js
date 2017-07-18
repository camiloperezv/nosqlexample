'use strict';
let mongoose = require('mongoose');
let {
  Schema
} = mongoose;
let UserSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    require: 'El email es obligatorio',
    unique: true,
    match: [
      /.+\@.+\..+/,
      'por favor entre un email valido'
    ],
    trim: true
  },
  age:{
    type: Number
  },
  phone: {
    type: Number
  },
});
const ageBody = 70;
//Configura el 'UserSchema' para usar getters y virtuals cuando se transforme a JSON
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});
mongoose.model('User', UserSchema);
