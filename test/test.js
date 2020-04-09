//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
// let Book = require('../app/models/book');
// let Password = require('../models/passwords');
let db = require('../models/index');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
// let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Books', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     db.Password.destroy({})
    //         .then((err)=> {
    //             done();
    //         });
    // });

    /*
     * Test the /GET route
     */
    describe('/GET book', () => {
        it('it should GET all the books', (done) => {
            chai.request(app)
                .get('/').end();
            done();
        });
    });

});





// // var expect = require("chai").expect;
// // var request = require("request");
// let app = require("../server");
// var chai = require("chai");
// var chaiHttp = require("chai-http");

// // Configure chai
// chai.use(chaiHttp);
// chai.should();

// describe("some tests", () => {
//     describe("GET /", () => {
//         // Test to get all students record
//         it("should get all students record", (done) => {
//             chai.request(app)
//                 .get('/')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     done();
//                 });
//         }); // Test to get single student record
//         // it("should get a single student record", (done) => {
//         //     const id = 1;
//         //     chai.request(app)
//         //         .get(`/${id}`)
//         //         .end((err, res) => {
//         //             res.should.have.status(200);
//         //             res.body.should.be.a('object');
//         //             done();
//         //         });
//         // });

//         // Test to get single student record
//         // it("should not get a single student record", (done) => {
//         //     const id = 5;
//         //     chai.request(app)
//         //         .get(`/${id}`)
//         //         .end((err, res) => {
//         //             res.should.have.status(404);
//         //             done();
//         //         });
//         // });
//     });
// });



// it('About page content', function(done) {
//     request('http://localhost:8080/about' , function(error, response, body) {
//         expect(response.statusCode).to.equal(404);
//         done();
//     });
// });


// it('Home page status', function(done) {
//     request('http://localhost:8080', function(error, response, body) {
//         expect(response.statusCode).to.equal(200);
//         done();
//     });
// });


// describe('App', function() {
//     it('responds with status 200', function(done) {
//         chai.request(app)
//             .get('/')
//             .end(function(err, res) {
//                 expect(res).to.have.status(200);
//                 done();
//             });
//     });
// });




// describe('App', function() {
//     describe('/set?somekey=somevalue', function() {
//       it('responds with status 200', function(done) {

//         chai.request(app)
//           .post('/set?somekey=somevalue')
//           .end(function(err, res) {
//             expect(res).to.have.status(200);
//             done();
//           });


//       });
//     });
//   });




// var expect = require("chai").expect;
// let should = require("chai").should;
// let chai = require("chai");
// Import the dependencies for testing
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../server'; // Configure chai
// chai.use(chaiHttp);
// chai.should();

// ***************************************************************************
// test.js - example with mocha
// ***************************************************************************
// describe("Multiply", function () {
//     it("should multiply properly when passed numbers", function () {
//         expect(multiply(2, 4)).to.equal(8);
//     });

//     it("should throw when not passed numbers", function () {
//         expect(function () {
//             multiply(2, "4");
//         }).to.throw(Error);
//     });
// });


// describe("GET /", () => {

// });




// describe("Students", () => {
//     describe("GET /", () => {
//         // Test to get all students record
//         it("should get all students record", (done) => {
//             chai.request(app)
//                 .get('/')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     done();
//                 });
//         }); // Test to get single student record
//         it("should get a single student record", (done) => {
//             const id = 1;
//             chai.request(app)
//                 .get(`/${id}`)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     done();
//                 });
//         });

//         // Test to get single student record
//         it("should not get a single student record", (done) => {
//             const id = 5;
//             chai.request(app)
//                 .get(`/${id}`)
//                 .end((err, res) => {
//                     res.should.have.status(404);
//                     done();
//                 });
//         });
//     });
// });

// ***************************************************************************
// index.js - file - exmaple
// ***************************************************************************
// var multiply = function (x, y) {
//     if (typeof x !== "number" || typeof y !== "number") {
//         throw new Error("x or y is not a number.");
//     } else {
//         return x * y;
//     }
// };
// module.exports = multiply;