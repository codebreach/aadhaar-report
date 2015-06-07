'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var chance = require('chance')();

var enumValues = ['Driving Record', 'Criminal Record', 'Court Case', 'Living Situation'];

var PublicRecordSchema = new Schema({
  kind: {
    type: String,
    enum: enumValues,
    required: true
  },
  severity: { type: Number, min: 1, max: 10, required: true },
  recordId: { type: String, required: true },
  description: String,
  recordDate: { type: Date, default: Date.now },
  guilty: Boolean
});

function getRandomInt(min, max) {
  return chance.integer({min: min, max: max - 1});
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

PublicRecordSchema.statics.generateRandom = function() {
  return {
    kind: enumValues[getRandomInt(0, enumValues.length)],
    severity: getRandomInt(1, 11),
    recordId: pad(getRandomInt(1, 100000), 6),
    recordDate: chance.birthday(),
    guilty: chance.bool()
  };
};

module.exports = mongoose.model('PublicRecord', PublicRecordSchema);
