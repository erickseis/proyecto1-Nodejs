// Utils
const { checkValidations, body } = require('../utils/expressValidator.util')
const { Op } = require('../utils/database.utils')

// Models
const { User } = require('../models/user.model')

const strongPasswordOptions = {
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
    pointsForContainingLower: 10,
    pointsForContainingNumber: 10,
    pointsForContainingUpper: 10,
    pointsPerRepeat: 1,
    pointsPerUnique: 2,
    returnScore: false,
}

const checkRole = async (role) => {
    if (role !== 'admin' && role !== 'normal') {
        throw new Error('Invalid role')
    }
}

const checkCreateEmailExist = async (email) => {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
        throw new Error('Email already in use')
    }
}

const checkUpdateEmailExist = async (email, req) => {
    const userId = req.req.user.id
    const existingUser = await User.findOne({
        where: { email, id: { [Op.not]: userId } },
    })
    if (existingUser) {
        throw new Error('Email already in use')
    }
}

const createUserValidators = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    body('email')
        .isEmail()
        .withMessage('Must provide a valid email')
        .custom(checkCreateEmailExist),
    body('password')
        .isStrongPassword(strongPasswordOptions)
        .withMessage(
            'Please enter a password at least 8 character and contain At least one uppercase. At least one lower case.At least one number.'
        ),
    body('role').custom(checkRole),
    checkValidations,
]

const updateUserValidators = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    body('email')
        .isEmail()
        .withMessage('Must provide a valid email')
        .custom(checkUpdateEmailExist),
    checkValidations,
]

const loginUserValidators = [
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password').notEmpty().withMessage('Must provide a password.'),
    checkValidations,
]

module.exports = {
    createUserValidators,
    updateUserValidators,
    loginUserValidators,
}
