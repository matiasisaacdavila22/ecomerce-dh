
module.exports = (secquelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } ,
        name: {
            type: dataTypes.STRING,
        },
        trademark: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING,
        } ,
        category: {
            type: dataTypes.STRING,
        },
        cost_price: {
            type: dataTypes.STRING,
        },
        sale_price: {
            type: dataTypes.STRING,
        },
        stock: {
            type: dataTypes.STRING,
        },
        condition: {
            type: dataTypes.STRING,
        },
        active: {
            type: dataTypes.STRING,
        },
    };

    let config = {
        tableName: "product",
        timestamps: false
    }

    const Producto = sequelize.define(alias, cols, config);

    return Producto;
}