const Joi = require(`joi`);
const {productsValidators: {updateProductValidator}} = require(`../../validators`)
const ErrorHandler = require(`../../errors/errorHandler`)
const {errorsStatusEnum: {UNAUTHORIZED}} = require(`../../constants`)


module.exports = async (req, res, next) => {
    try {
        const product = req.body;

        const {error} = Joi.validate(product, updateProductValidator);

        if (error) {
            return next(new ErrorHandler(
                error.details[0].message,
                UNAUTHORIZED))
        }

        next();
    } catch (e) {
        console.log(e);
    }
}
