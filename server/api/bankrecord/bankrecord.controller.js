'use strict';

var _ = require('lodash');
var Bankrecord = require('./bankrecord.model');

// Get list of bankrecords
exports.index = function(req, res) {
  Bankrecord.find(function (err, bankrecords) {
    if(err) { return handleError(res, err); }
    return res.json(200, bankrecords);
  });
};

// Get a single bankrecord
exports.show = function(req, res) {
  Bankrecord.findById(req.params.id, function (err, bankrecord) {
    if(err) { return handleError(res, err); }
    if(!bankrecord) { return res.send(404); }
    return res.json(bankrecord);
  });
};

// Creates a new bankrecord in the DB.
exports.create = function(req, res) {
  Bankrecord.create(req.body, function(err, bankrecord) {
    if(err) { return handleError(res, err); }
    return res.json(201, bankrecord);
  });
};

// Updates an existing bankrecord in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Bankrecord.findById(req.params.id, function (err, bankrecord) {
    if (err) { return handleError(res, err); }
    if(!bankrecord) { return res.send(404); }
    var updated = _.merge(bankrecord, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, bankrecord);
    });
  });
};

// Deletes a bankrecord from the DB.
exports.destroy = function(req, res) {
  Bankrecord.findById(req.params.id, function (err, bankrecord) {
    if(err) { return handleError(res, err); }
    if(!bankrecord) { return res.send(404); }
    bankrecord.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}