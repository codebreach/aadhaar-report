/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Bankrecord = require('./bankrecord.model');

exports.register = function(socket) {
  Bankrecord.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Bankrecord.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('bankrecord:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('bankrecord:remove', doc);
}