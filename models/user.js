module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // Giving the Author model a name of type STRING
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        }
    }, {
        timestamps: false
    });

    User.associate = function (models) {
        User.hasMany(models.Passwords, {
            onDelete: "cascade",
            foreignKey: "ownerKey"
        })
    };


    return User;
};