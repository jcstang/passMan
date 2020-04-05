module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("Author", {
        // Giving the Author model a name of type STRING
        name: DataTypes.STRING
    });

    // User.associate = function (models) {
    //     // Associating Author with Posts
    //     // When an Author is deleted, also delete any associated Posts
    //     User.hasMany(models.Passwords, {
    //         onDelete: "cascade"
    //     });
    // };

    return User;
};