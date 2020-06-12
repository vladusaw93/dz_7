const {mailerservices, userServices, productServices} = require('../services');
const {emailEnum: {NOPHOTO}} = require('../constants');

module.exports = async () => {
    try {
        const products = await productServices.getProductByParams({photo: null});

        products.map(async value => {
            const {userId} = value;
            const userById = await userServices.getUserBuId(userId);
            console.log(userById);
            await mailerservices.sendMails(userById.email, NOPHOTO, {userName: userById.name});
        });
    } catch (e) {
        console.log(e);
    }


};
