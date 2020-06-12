const {productServices, userServices, mailerservices} = require(`../../services`)
const {hasher} = require(`../../helpers`)
const uuid = require('uuid').v1();
const path = require('path');
const fsExtra = require('fs-extra').promises;

const {
    errorHandler,
    errors: {
        NOPRODUCT,
    }
} = require(`../../errors`)

const {
    errorsStatusEnum: {UNAUTHORIZED},
    emailEnum: {NEWPRODUCT, DELETEDPRODUCT, UPDATEPRODUCT}
} = require(`../../constants`)

module.exports = {

    getProduct: async (req, res) => {
        const allProduct = await productServices.getProduct();
        res
            .json(allProduct)
            .end();
    },

    getoneProduct: async (req, res, next) => {
        const {productId} = req.params;

        const product = await productServices.getOneProduct(productId);

        if (!product) {
            return next(new errorHandler(
                NOPRODUCT.message,
                UNAUTHORIZED,
                NOPRODUCT.code));
        }

        res
            .json(product)
            .end()
    },

    createProducts: async (req, res, next) => {
        try {
            const product = req.body;
            const [avatar] = req.photos;

            const user = await userServices.getUserBuId(res.userId);
            await mailerservices.sendMails(user.email, NEWPRODUCT, {userName: user.name});

            await productServices.AddProduct(product);
            const {id} = product;
            const photoDir = `products/${id}/photos`;
            const splitedFile = avatar.name.split(`.`).pop();
            const photoName = `${uuid}.${splitedFile}`;

            await fsExtra.mkdir(path.resolve(process.cwd(), `public`, photoDir), {recursive: true});
            await avatar.mv(path.resolve(process.cwd(), `public`, photoDir, photoName));
            const updatedProduct = await productServices.updateProductById(id, {photo: `/${photoDir}/${photoName}`});
            res.json(updatedProduct);
            res.end();
        } catch (e) {
            console.log(e.message);
        }
        next();
    },

    deletProduct: async (req, res, next) => {
        const {productId} = req.params;
        const product = await productServices.getOneProduct(req.params.productId);

        const user = await userServices.getUserBuId(res.userId);


        if (!product) {
            return next(new errorHandler(
                NOPRODUCT.message,
                UNAUTHORIZED,
                NOPRODUCT.code));
        }

        await productServices.deleteProduct(productId);
        await mailerservices.sendMails(user.email, DELETEDPRODUCT);

        res.end();
    },

    updateProduct: async (req, res) => {
        const {productId} = req.params;
        const product = req.body;

        const user = await userServices.getUserBuId(res.userId);


        if (product.kupon) {
            product.kupon = await hasher(product.kupon);
        }
        await productServices.UpdateProduct(productId, req.body);
        await mailerservices.sendMails(user.email, UPDATEPRODUCT);
        res.end();
    },
    deleteProductPhoto: async (req, res, next) => {
        try {
            const productByParams = await productServices.getProductByParams({id: req.productId});
            await productServices.updateProductById(productByParams.id, {photo: null})
        } catch (e) {
            console.log(e);
        }
        next();
    }


}
