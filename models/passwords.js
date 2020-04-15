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

        // TODO: add a website field
        
    });

    Passwords.associate = (models) => {
        Passwords.belongsTo(models.User, {
            allowNull: false,
            foreignKey: "ownerKey"
        });
    };


    return Passwords;
};