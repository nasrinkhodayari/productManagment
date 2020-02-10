module.exports = (sequelize, DataTypes) => {
    const Product_images = sequelize.define("product_images", {
        product_image_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: DataTypes.TEXT,
        product_id: DataTypes.INTEGER,
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
                Product_image.belongsTo(models.Product, {
                    onDelete: "CASCADE",
                    foreignKey: 'product_id',
                });
            }
        }
    });
    return Product_images;
}