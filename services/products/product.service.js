const DataBase = require(`../../DataBase`).getInstance();
const {moduleNamesEnum: {PRODUCT}} = require(`../../constants`)

module.exports = {

    getProduct: async () => {
        const ProductModel = DataBase.getModels(PRODUCT);
        console.log(ProductModel);
        const products = await ProductModel.findAll({});
        return products;
    },

    getOneProduct: async (productId) => {
        const ProductModel = DataBase.getModels(PRODUCT);
        return ProductModel.findByPk(productId);
    },

    AddProduct: (product) => {
        const ProductModel = DataBase.getModels(PRODUCT);

        return ProductModel.create(product);
    },

    deleteProduct: (idOfProduct) => {
        const ProductModel = DataBase.getModels(PRODUCT);
        return ProductModel.destroy({
            where: {
                id: idOfProduct,
            }
        });
    },

    UpdateProduct: (idOfProduct, paramsToUpdate) => {
        const {name, code, title, price, kupon} = paramsToUpdate;
        const ProductModel = DataBase.getModels(PRODUCT);
        const updatedProd = ProductModel.update({
                name: name,
                code: code,
                title: title,
                price: price,
                kupon: kupon,
            },
            {
                where: {
                    id: idOfProduct,
                }
            });
        return updatedProd;
    },
    updateProductById: (id,newProductFields) => {
        const ProductModel = DataBase.getModels(PRODUCT);

        return ProductModel.update(
            newProductFields,
            {where: {id}},
        )
    },
    getProductByParams: (params) => {
        const ProductModel = DataBase.getModels(PRODUCT);
        return ProductModel.findAll({
            where: params
        })
    },
}

