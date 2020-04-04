module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define("User", {
        exampleFieldName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]    // at least 1 char long
            }
        },
    });

    User.associate = function(models) {
        // TODO: add the belongsTo or one of many stuff
    }

};