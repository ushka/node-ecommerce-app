const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email.')
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email });
      if(existingUser) {
        throw new Error('Email already in use.');
      }
    }),
  requirePassword: check('password')
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage('Must be between 6 and 30 characters'),
  requirePasswordConfirmation: check('passwordconfirmation')
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage('Must be between 6 and 30 characters')
    .custom(async (passwordconfirmation, { req }) => {
      if(passwordconfirmation !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
    })
}