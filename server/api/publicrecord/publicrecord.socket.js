/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Publicrecord = require('./publicrecord.model');

exports.register = function(socket) {
  Publicrecord.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Publicrecord.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('publicrecord:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('publicrecord:remove', doc);
}