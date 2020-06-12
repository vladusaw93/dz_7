const {errorHandler, errors: {INVLIADUSERTOPHOTO}} = require('../../errors');
const {errorsStatusEnum: {UNAUTHORIZED}} = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        if (req.product.userId !== req.userId) {
            return next(new errorHandler(
                INVLIADUSERTOPHOTO.message,
                UNAUTHORIZED,
                INVLIADUSERTOPHOTO.code
            ));
        }
        req.productId =req.id;
        next();
    } catch (e) {
        console.log(e);
    }

};
