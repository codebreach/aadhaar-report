'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var chance = require('chance')();

var enumValues = [
  'Credit Card', 'Current', 'Savings',
  'Fixed Deposit', 'Home Loan', 'Student Loan',
  'Auto Loan', 'Other Loan', 'Other'
];

var BankRecordSchema = new Schema({
  kind: {
    type: String,
    enum: enumValues,
    required: true
  },
  openDate: { type: Date, required: true },
  bank: { type: String, required: true },
  severity: { type: Number, min: 1, max: 10, required: true },
  amount: { type: Number, required: true },
  defaults: { type: Number, min: 0, required: true, default: 0 }
});

function getRandomInt(min, max) {
  return chance.integer({min: min, max: max - 1});
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

BankRecordSchema.statics.generateRandom = function() {
  return {
    kind: enumValues[getRandomInt(0, enumValues.length)],
    severity: getRandomInt(1, 11),
    amount: getRandomInt(1000, 10000000),
    bank: chance.pick(['ICICI', 'AXIS', 'SBI', 'HDFC', 'CITI']),
    openDate: chance.birthday(),
    defaults: getRandomInt(0, 10)
  };
};

module.exports = mongoose.model('BankRecord', BankRecordSchema);

