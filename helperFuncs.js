const db = require('./models');

function isANumber(value) {
    return (typeof value === 'number');
}

function createPasswordObject(passwordObject, userObject) {
    // console.log('========================================= thing3');
    // console.log(passwordObject);
    // console.log(userObject);
    
    let passPasswords = [];
    passwordObject.forEach(element => {
        // console.log('========================================= thing3a');
        passPasswords.push({
            id: element.id,
            description: element.description,
            username: element.userName,
            password: element.password,
            ownerKey: element.ownerKey
        });
        // console.log('========================================= thing3b');
    });
    
    // DATA passing is working. I just refrenced {{username}} and handlebars picked it up
    let finishedObject = {
        passwords: passPasswords,
        theusername: userObject.user_name,
        theId: userObject.id  // this is the logged in username NOT a saved username/password
    };
    // console.log('========================================= thing4');
    return finishedObject;
}



module.exports = {
    isANumber,
    createPasswordObject
}