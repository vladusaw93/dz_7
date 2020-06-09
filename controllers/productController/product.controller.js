const {productServices, userServices, mailerservices} = require(`../../services`)
const {hasher} = require(`../../helpers`)
const {
    errorHandler,
    errors: {
        NOPRODUCT,
    }
} = require(`../../errors`)

const {
    errorsStatusEnum: {UNAUTHORIZED},
    emailEnum: {NEWPRODUCT,DELETEDPRODUCT,UPDATEPRODUCT}
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

    createProducts: async (req, res) => {
        const product = req.body;
        const user = await userServices.getUserBuId(res.userId);
        await mailerservices.sendMails(user.email, NEWPRODUCT, {userName: user.name});

        await productServices.AddProduct(product);

        res.end();
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
    }
}
