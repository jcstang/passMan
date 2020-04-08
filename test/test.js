var expect = require("chai").expect;
// var multiply = require("../index");

// ***************************************************************************
// index.js - file - exmaple
// ***************************************************************************
var multiply = function (x, y) {
    if (typeof x !== "number" || typeof y !== "number") {
        throw new Error("x or y is not a number.");
    } else {
        return x * y;
    }
};
// module.exports = multiply;


// ***************************************************************************
// test.js - example with mocha
// ***************************************************************************
describe("Multiply", function () {
    it("should multiply properly when passed numbers", function () {
        expect(multiply(2, 4)).to.equal(8);
    });

    it("should throw when not passed numbers", function () {
        expect(function () {
            multiply(2, "4");
        }).to.throw(Error);
    });
});


