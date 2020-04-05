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

    // Passwords.associate = function (models) {
    //     // We're saying that a Post should belong to an Author
    //     // A Post can't be created without an Author due to the foreign key constraint
    //     Passwords.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Passwords;
};