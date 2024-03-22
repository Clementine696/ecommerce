const express = require('express');
// const { signup, signin, signout } = require('../../controllers/admin/auth');
const router = express.Router();
// const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require ('../../validaters/auth');
// const { requireSignin } = require('../../common-middleware');
const { initialData } = require('../../controllers/admin/initialData');


router.post('/initialdata', initialData);

module.exports = router;