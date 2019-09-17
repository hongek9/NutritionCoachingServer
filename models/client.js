module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('client', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        primaryGoal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coach: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
    return Client;
}