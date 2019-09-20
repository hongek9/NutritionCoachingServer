module.exports = (sequelize, DataTypes) => {
    const Macros = sequelize.define('macros', {
        protein: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carbs: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fat: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coach: {
            type: DataTypes.INTEGER,
            allowNull: false
        }


    })
    return Macros;
}