const { body, validationResult } = require('express-validator')


const contactValidationRules = () => {
    return [
        body('firstName').trim().isLength({ min: 1, max: 15 }),
        body('lastName').trim().isLength({ min: 1, max: 15 }),
        body('email').trim().isEmail(),
        body('favoriteColor').trim().isLength({ min: 1, max: 15 }),
        body('birthday').isEmail()
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    console.log(errors);
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg })) // ! If not path try param

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    contactValidationRules,
    validate
}