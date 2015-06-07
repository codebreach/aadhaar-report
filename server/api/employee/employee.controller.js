'use strict';

var _ = require('lodash');
var Employee = require('./employee.model');
var PublicRecord = require('../publicrecord/publicrecord.model');
var BankRecord = require('../bankrecord/bankrecord.model');
var request = require('request');
var errorMessages = require('./errors');
var chance = require('chance')();

// Get list of employees
exports.index = function(req, res) {
  Employee.find(function (err, employees) {
    if(err) { return handleError(res, err); }
    return res.json(200, employees);
  });
};

var generateBody = function(body) {
  return {
    "aadhaar-id": body.aadhaar,
    "device-id": "public",
    "certificate-type": "preprod",
    "location": {
      "type": "pincode",
      "pincode": body.pincode
    }
  }
};

var makeOtpRequest = function(req, res) {
  var otpBody = generateBody(req.body);
  otpBody['channel'] = 'SMS';
  var options = {
    url: 'https://ac.khoslalabs.com/hackgate/hackathon/otp',
    method: 'POST',
    json: true,
    body: otpBody
  }

  request(options, function(err, response, body) {
    if (err || response.statusCode != 200) {
      console.log(err, body);
      res.json(400, {error: body});
      return;
    }
    if (body.success) {
      res.json(200, body);
    } else {
      res.json(400, {error: body, message: errorMessages[body['aadhaar-status-code']]});
    }
  });
}

exports.validate = function(req, res) {
  console.log(req.body);
  var body = generateBody(req.body);
  body['demographics'] = {
    "name": {
      "matching-strategy": "exact",
      "name-value": req.body.full_name
    }
  };
  body['modality'] = "demo";

  var options = {
    url: 'https://ac.khoslalabs.com/hackgate/hackathon/auth/raw',
    method: 'POST',
    json: true,
    body: body
  }
  request(options, function(err, response, body) {
    if (err || response.statusCode != 200) {
      console.log(err, body);
      res.json(400, {error: body});
      return;
    }
    if (body.success) {
      makeOtpRequest(req, res);
    } else {
      res.json(400, {error: body, message: errorMessages[body['aadhaar-status-code']]});
    }
  });
}

var handleValidOtp = function(req, res, body) {
  var numBankRecords = chance.integer({min: 1, max: 5});
  var numPublicRecords = chance.integer({min: 1, max: 5});
  var bankRecords = [];
  var publicRecords = [];
  for (var i = 0; i < numPublicRecords; i++) {
    publicRecords.push(PublicRecord.generateRandom());
  }
  for (var i = 0; i < numBankRecords; i++) {
    bankRecords.push(BankRecord.generateRandom());
  }
  console.log(numBankRecords, bankRecords);
  console.log(numPublicRecords, publicRecords);
  Employee.findOneAndUpdate(
    { aadhaar: { $eq: req.body.aadhaar } },
    {
      $set: body.kyc,
      $setOnInsert: {
        publicRecords: publicRecords,
        bankRecords: bankRecords
      },
      $addToSet: {
        managedBy: req.user.id
      }
    },
    { upsert: true },
    function(err, foundEmployee) {
      if (err) {
        console.log(err);
        res.json(500, {error: err});
        return;
      }
      if (foundEmployee) {
        console.log(foundEmployee);
        res.json(200, foundEmployee);
      }
    }
  );
};

exports.validateOtp = function(req, res) {
  console.log(req.body);
  var options = {
    url: 'https://ac.khoslalabs.com/hackgate/hackathon/kyc/raw',
    method: 'POST',
    json: true,
    body: {
      "consent": "Y",
      "ts": new Date().toISOString(),
      "auth-capture-request": {
        "aadhaar-id": req.body.aadhaar,
        "device-id": "public",
        "certificate-type": "preprod",
        "otp": req.body.otp,
        "location": {
          "type": "pincode",
          "pincode": req.body.pincode
        },
        "modality": "otp"
      }
    }
  }
  request(options, function(err, response, body) {
    if (err || response.statusCode != 200) {
      console.log(err, body);
      res.json(400, {error: body});
      return;
    }
    if (body.success) {
      handleValidOtp(req, res, body);
    } else {
      res.json(400, {error: body, message: errorMessages[body['aadhaar-status-code']]});
    }
  });
}

// Get a single employee
exports.forUser = function(req, res) {
  Employee.find({ managedBy: req.params.id }, function (err, employees) {
    if(err) { return handleError(res, err); }
    return res.json(200, employees);
  });
};

// Get a single employee
exports.show = function(req, res) {
  Employee.findById(req.params.id, function (err, employee) {
    if(err) { return handleError(res, err); }
    if(!employee) { return res.send(404); }
    return res.json(employee);
  });
};

// Creates a new employee in the DB.
exports.create = function(req, res) {
  Employee.create(req.body, function(err, employee) {
    if(err) { return handleError(res, err); }
    return res.json(201, employee);
  });
};

// Updates an existing employee in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Employee.findById(req.params.id, function (err, employee) {
    if (err) { return handleError(res, err); }
    if(!employee) { return res.send(404); }
    var updated = _.merge(employee, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, employee);
    });
  });
};

// Updates an existing employee in the DB.
exports.addBankReport = function(req, res) {
  Employee.findById(req.params.id, function (err, employee) {
    if (err) { return handleError(res, err); }
    if(!employee) { return res.send(404); }
    employee.bankRecords.push(req.body);
    employee.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, employee);
    });
  });
};

// Updates an existing employee in the DB.
exports.addPublicReport = function(req, res) {
  Employee.findById(req.params.id, function (err, employee) {
    if (err) { return handleError(res, err); }
    if(!employee) { return res.send(404); }
    employee.publicRecords.push(req.body);
    employee.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, employee);
    });
  });
};

// Deletes a employee from the DB.
exports.destroy = function(req, res) {
  Employee.findById(req.params.id, function (err, employee) {
    if(err) { return handleError(res, err); }
    if(!employee) { return res.send(404); }
    employee.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
