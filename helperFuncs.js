const db = require('./models');

function isANumber(value) {
    return (typeof value === 'number');
}



module.exports = {
    isANumber
}