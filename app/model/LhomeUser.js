const { DataTypes } = require("sequelize");
const sequelize = require("../utilsFunction/dbFunctions"); // Import the Sequelize instance

const Lhome_User = sequelize.define(
    "Lhome_User",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        pincode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Lhome_Users",
        timestamps: true,
    }
);

module.exports = Lhome_User;
