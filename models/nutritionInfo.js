module.exports = (sequelize, DataTypes) => {
    const NutritionInfo = sequelize.define('nutritioninfo', {
        protein: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fat: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        carbs: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coach: {
            type: DataTypes.INTEGER,
            allowNull: true
        }


    })
    return NutritionInfo;
}