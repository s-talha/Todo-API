"use strict";

var should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose');

require('sinon-mongoose');

var TodoModel = require('../../api/models/todoListModel');

describe('TodoController testing', function () {

	describe('List all todo test', function () {
		it('Should call find once', function (done) {
			var TodoMock = sinon.mock(TodoModel);
			TodoMock
			.expects('find')
			.yields(null, 'TODOS');

			TodoModel.find(function (err, result) {
				TodoMock.verify();
				TodoMock.restore();
				should.equal('TODOS', result, "Test fails due to unexpected result")
				done();
			});
		});
	});

	describe('Delete todo test', function () {
		it('Should delete todo with gived id', function (done) {
			var TodoMock = sinon.mock(TodoModel);

			TodoMock
			.expects('remove')
			.withArgs({_id: 12345})
			.yields(null, 'DELETED');

			TodoModel.remove({_id: 12345}, function(err, result){
				TodoMock.verify();
				TodoMock.restore();
				done();
			})


		});
	});

	describe('Update a todo', function () {
		it('Should update the todo with new value', function (done) {
			var todoMock = sinon.mock(new TodoModel({ todo: 'Save new todo from mock'}));
			var todo = todoMock.object;

			todoMock
			.expects('save')
			.withArgs({_id: 12345})
			.yields(null, 'UPDATED');

			todo.save({_id: 12345}, function(err, result){
				todoMock.verify();
				todoMock.restore();
				done();
			})

		});
	});

});