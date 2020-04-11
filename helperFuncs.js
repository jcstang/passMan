const db = require('./models');

function isANumber(value) {
    return (typeof value === 'number');
}

function createPasswordObject(passwordObject, userObject) {
    
    
    let passPasswords = [];
    passwordObject.forEach(element => {
        passPasswords.push({
            id: element.id,
            description: element.description,
            username: element.userName,
            password: element.password
        });
    });
    
    // DATA passing is working. I just refrenced {{username}} and handlebars picked it up
    let finishedObject = {
        passwords: passPasswords,
        theusername: userObject.user_name,
        theId: userObject.id  // this is the logged in username NOT a saved username/password
    };
    
    return finishedObject;
}



module.exports = {
    isANumber,
    createPasswordObject
}