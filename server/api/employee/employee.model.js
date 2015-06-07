'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var moment = require('moment');

var BankRecord = require('../bankrecord/bankrecord.model');
var PublicRecord = require('../publicrecord/publicrecord.model');

var EmployeeSchema = new Schema({
  'aadhaar-id': {type: String, required: true, unique: true},
  photo: String,
  poi: { name: String, dob: String, gender: String },
  poa: { co: String, street: String, house: String, vtc: String, subdist: String, dist: String, state: String, pc: String, po: String },
  'bankRecords': [BankRecord.schema],
  'publicRecords': [PublicRecord.schema],
  managedBy: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

EmployeeSchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});

EmployeeSchema.virtual('score').get(function() {
  var baseScore = 800;
  // 20% credit owed to the bank (determined via credit cards, loans (home, auto, student))
  var creditOwedScore = 0.2 * baseScore;
  // 10% credit vs debt score
  var debtScore = 0.1 * baseScore;
  // 10% Credit length (no. of years the credit cards, loans have been in use)
  var creditLenthScore = 0.1 * baseScore;
  // 20% Timely payment (payment history, any defaulting on loan payment, credit card bills or anything )
  var creditTimelyScore = 0.2 * baseScore;
  // 30% public records ( driving + public records of criminal records, bankruptcies declared, court issues)
  var publicRecordsScore = 0.3 * baseScore;
  // 10% guily public records
  var guilyRecordsScore = 0.1 * baseScore;

  var bankRecords = this.bankRecords;
  var loanAccounts = bankRecords.filter(function (x) { return x.kind.indexOf('Loan') > 0 || x.kind.indexOf('Credit') > 0; });
  var nonLoanAccounts = bankRecords.filter(function (x) { return x.kind.indexOf('Loan') < 0 && x.kind.indexOf('Credit') < 0; });

  var averageLoanLength = 0;
  var maxLoanLength = 0;

  var totalDefaults = 0;

  var totalLoan = 0;
  loanAccounts.forEach(function(x) {
    totalLoan += x.amount;
    var loanLength = moment().diff(moment(x.openDate), 'years', true);
    averageLoanLength += loanLength;
    totalDefaults += x.defaults;
    maxLoanLength = Math.max(maxLoanLength, loanLength);
  });
  averageLoanLength = averageLoanLength / loanAccounts.length;

  var avergeLoan = totalLoan / loanAccounts.length;
  var totalAssets = 0;
  nonLoanAccounts.forEach(function(x) {totalAssets += x.amount});

  debtScore = debtScore * Math.min(1, totalAssets/totalLoan);
  creditOwedScore = creditOwedScore * Math.max(0, Math.min(1, 1-(totalLoan/avergeLoan)));
  creditLenthScore = creditLenthScore * Math.min(1, averageLoanLength/maxLoanLength);
  creditTimelyScore = creditTimelyScore * totalDefaults / (loanAccounts.length * 10);

  var publicRecords = this.publicRecords;
  var guiltyRecord = publicRecords.filter(function (x) { return x.guilty; });
  guilyRecordsScore = guilyRecordsScore * Math.min(1, 1 - (guiltyRecord.length / publicRecords.length));

  publicRecordsScore = Math.min(0, publicRecordsScore - publicRecords.length * 20);

  return (debtScore + creditTimelyScore + creditOwedScore + publicRecordsScore + guilyRecordsScore + creditLenthScore);
});

EmployeeSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
