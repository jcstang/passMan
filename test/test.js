//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let expect = require('chai').expect;
let helper = require('../helperFuncs');


describe('isANumber func', () => {
    it('it should return true if passed a number', (done) => {
        expect( helper.isANumber(7) ).to.be.true;
        done();
    });

    it('it should return false if passed a string', (done) => {
        expect( helper.isANumber("7") ).to.be.false;
        done();
    });

    it('it should return false if passed an object', (done) => {
        let object = {
            name: 'joe'
        };

        expect( helper.isANumber(object) ).to.be.false;
        done();
    });

});

describe('createPasswordObject', () => {
    it('it should be awesome when called', (done) => {
        let iBoolean = true;
        expect(iBoolean).to.be.true;
        done();
    });
});
