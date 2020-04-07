module.exports = function (sequelize, DataTypes) {
    var Passwords = sequelize.define("Passwords", {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        userName: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Passwords.associate = (models) => {
        Passwords.belongsTo(models.User, {
            allowNull: false,
            foreignKey: "id"
        });
    };

    // Passwords.associate = (models) => {
    //     Passwords.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false,
    //             foreignKey: "id",
    //             as: "Password"
    //         }
    //     });
    // };


    return Passwords;
};