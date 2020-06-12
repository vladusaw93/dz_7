const {errorHandler, errors: {TOMUCHFILES, INVALIDFILE}} = require(`../../errors`)
const {errorsStatusEnum: {BAD_REQUEST}} = require(`../../constants`)

module.exports = (req, res, next) => {
    if (req.documents.length) {
        return next(new errorHandler(
            INVALIDFILE.message,
            BAD_REQUEST,
            INVALIDFILE.code)
        )
    }

    next();

    if (req.photos.length > 1) {
        return next(
            new errorHandler(TOMUCHFILES.message,
                BAD_REQUEST,
                TOMUCHFILES.code));
    }
}
