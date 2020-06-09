const {Router} = require(`express`);
const productRouter = Router();

const {
    ProductMiddlowares: {ValidProduct, checkProductToUpdate},
    authMidlovare: {validToken}
} = require(`../../middelwars`);


const {productContorller} = require(`../../controllers`)

productRouter.get(`/`, productContorller.getProduct);
productRouter.post(`/`, ValidProduct, validToken, productContorller.createProducts);


productRouter.get(`/:productId`, productContorller.getoneProduct);
productRouter.delete(`/:productId`, validToken,productContorller.deletProduct);
productRouter.put(`/:productId`, checkProductToUpdate,validToken, productContorller.updateProduct);

module.exports = productRouter;
