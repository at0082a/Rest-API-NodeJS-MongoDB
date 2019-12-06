const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require("mongoose");
require("sinon-mongoose");

const ToDo = require("../models/schema");

describe("Get all todos", () => {
 it("should return all todos", (done) => {
     let TodoMock = sinon.mock(ToDo);
     let expectedResult = {status: true, todo: []};
     TodoMock.expects('find').yields(null, expectedResult);
     ToDo.find( (err, result) => {
         TodoMock.verify();
         TodoMock.restore();
         expect(result.status).to.be.true;
         done();
        });
    });
});

describe("Post a new todo", () => {
    it("should create a new todo", (done) => {
        let TodoMock = sinon.mock(new ToDo({ todo: 'Save new todo from mock'}));
        let todo = TodoMock.object;
        let expectedResult = { status: true };
        TodoMock.expects('save').yields(null, expectedResult);
        todo.save((err, result) => {
            TodoMock.verify();
            TodoMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
});

