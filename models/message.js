module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
        overview: {
            type: DataTypes.STRING,
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
    return Message;
}