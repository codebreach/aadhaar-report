'use strict';

var _ = require('lodash');
var Publicrecord = require('./publicrecord.model');

// Get list of publicrecords
exports.index = function(req, res) {
  Publicrecord.find(function (err, publicrecords) {
    if(err) { return handleError(res, err); }
    return res.json(200, publicrecords);
  });
};

// Get a single publicrecord
exports.show = function(req, res) {
  Publicrecord.findById(req.params.id, function (err, publicrecord) {
    if(err) { return handleError(res, err); }
    if(!publicrecord) { return res.send(404); }
    return res.json(publicrecord);
  });
};

// Creates a new publicrecord in the DB.
exports.create = function(req, res) {
  Publicrecord.create(req.body, function(err, publicrecord) {
    if(err) { return handleError(res, err); }
    return res.json(201, publicrecord);
  });
};

// Updates an existing publicrecord in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Publicrecord.findById(req.params.id, function (err, publicrecord) {
    if (err) { return handleError(res, err); }
    if(!publicrecord) { return res.send(404); }
    var updated = _.merge(publicrecord, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, publicrecord);
    });
  });
};

// Deletes a publicrecord from the DB.
exports.destroy = function(req, res) {
  Publicrecord.findById(req.params.id, function (err, publicrecord) {
    if(err) { return handleError(res, err); }
    if(!publicrecord) { return res.send(404); }
    publicrecord.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}