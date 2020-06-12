const {
    errorHandler,
    errors: {INVALIDFILE, INVALIDFIFESIZE}
} = require(`../../errors`);

const {
    errorsStatusEnum: {FORBIDDEN, BAD_REQUEST},
    filesMimetypesEnum: {
        DOC_MIMETYPES, PHOTO_MIMETYPES,
        MAX_DOC_SIZE, MAX_PHOTO_SIZE,
    },
} = require(`../../constants`);

module.exports = (req, res, next) => {
    req.photos = [];
    req.documents = [];

    if (!req.files) {
        next();
        console.log(`no file`);
    }

    const file = Object.values(req.files);

    file.map(file => {
        const {size, mimetype, name} = file;
        if (PHOTO_MIMETYPES.includes(mimetype)) {

            if (size > MAX_PHOTO_SIZE) {
                return next(
                    new errorHandler(
                        INVALIDFIFESIZE.message,
                        BAD_REQUEST,
                        INVALIDFIFESIZE.code));
            }

            req.photos.push(file)

        } else if (DOC_MIMETYPES.includes(mimetype)) {

            if (size > MAX_DOC_SIZE) {
                return next(
                    new errorHandler(
                        INVALIDFIFESIZE.message,
                        BAD_REQUEST,
                        INVALIDFIFESIZE.code));
            }

            req.documents.push(file)

        } else {

            next(new errorHandler(
                INVALIDFILE.message,
                FORBIDDEN,
                INVALIDFILE.code))
        }
    })

    next();
}
