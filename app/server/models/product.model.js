module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.TEXT,
        url: DataTypes.TEXT,
        price: DataTypes.DECIMAL,
        msrp: DataTypes.DECIMAL,
        available: DataTypes.BOOLEAN,
        description: DataTypes.TEXT,
        merchant_id:DataTypes.INTEGER,
        category_id:DataTypes.INTEGER,
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                Product.hasMany(models.Product_images, { foreignKey: 'product_id' });
                Product.belongsTo(models.Merchant, {
                    onDelete: "CASCADE",
                    foreignKey: 'merchant_id',
                });
                Product.belongsTo(models.Categories, {
                    onDelete: "CASCADE",
                    foreignKey: 'category_id',
                });
            }
        }
    });
    return Product;
};