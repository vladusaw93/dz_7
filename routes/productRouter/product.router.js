const {Router} = require(`express`);
const productRouter = Router();

const {
    ProductMiddlowares: {
        ValidProduct,
        checkProductToUpdate, validToDeltePhoto
    },

    authMidlovare: {validToken},

    ValidFiles: {
        ChecklvalidFiles,
        CheckvalidFilesToUpload,
    }
} = require(`../../middelwars`);


const {productContorller} = require(`../../controllers`)

productRouter.get(`/`, productContorller.getProduct);

productRouter.post(`/`,
    ValidProduct, validToken,
    ChecklvalidFiles,
    CheckvalidFilesToUpload,
    productContorller.createProducts);


productRouter.get(`/:productId`, productContorller.getoneProduct);
productRouter.delete(`/:productId`, validToken, productContorller.deletProduct);
productRouter.put(`/:productId`, checkProductToUpdate, validToken, productContorller.updateProduct);

productRouter.delete(`/deletePhoto`,
    validToken,
    validToDeltePhoto,
    productContorller.deleteProductPhoto);

module.exports = productRouter;
