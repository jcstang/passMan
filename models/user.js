module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // Giving the Author model a name of type STRING
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    }, {
        timestamps: false
    });

    User.associate = function(models) {
        User.hasMany(models.Passwords, {
            onDelete: "cascade",
            foreignKey: "ownerKey"
        })
    };

    // User.associate = function (models) {
    //     // Associating Author with Posts
    //     // When an Author is deleted, also delete any associated Posts
    //     User.hasMany(models.Passwords, {
    //         onDelete: "cascade"
    //     });
    // };

    return User;
};