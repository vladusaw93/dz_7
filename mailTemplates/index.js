const {emailEnum} = require(`../constants`)

module.exports = {
    [emailEnum.REGUSER]: {
        subject: `[shop] Registration`,
        templateFileName: `reg`,
    },
    [emailEnum.NEWPRODUCT]: {
        subject: `[shop] new Product`,
        templateFileName: `newProd`,
    },
    [emailEnum.DELETEDPRODUCT]: {
        subject: `[shop] destroy product`,
        templateFileName: `deletedProduct`,
    },
    [emailEnum.DELETEDUSER]: {
        subject: `[shop] destroy user`,
        templateFileName: `deletedUser`,
    },
    [emailEnum.UPDATEPRODUCT]: {
        subject: `[shop] update product`,
        templateFileName: `updateProduct`,
    },
}
