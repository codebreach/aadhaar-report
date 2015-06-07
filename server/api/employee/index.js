'use strict';

var express = require('express');
var controller = require('./employee.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/validate', auth.isAuthenticated(), controller.validate);
router.post('/validateOtp', auth.isAuthenticated(), controller.validateOtp);
router.get('/for/:id', auth.isAuthenticated(), controller.forUser);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id/bankReport', auth.isAuthenticated(), controller.addBankReport);
router.put('/:id/publicReport', auth.isAuthenticated(), controller.addPublicReport);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
