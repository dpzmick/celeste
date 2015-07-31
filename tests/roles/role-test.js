var should = require('chai').should(); // eslint-disable-line

var Role = require('../../lib/roles/role.js');

describe('Role', function () {
    var role = null;

    describe('constructor', function () {
        it('should set a uuid on the object', function () {
            role = new Role();
            role.should.have.property('uuid');
        });
    });

    describe('getUUID', function () {
        it('should exist', function () {
            role.getUUID.should.be.a('function');
        });

        it('should return the uuid on the object', function () {
            var uuid = role.getUUID();

            uuid.should.equal(role.uuid);
        });
    });

    describe('error functions', function () {
        it('they both should have IS_FAKE_STUB', function () {
            role.handleAction.should.have.property('IS_FAKE_STUB');
            role.getInitialStateData.should.have.property('IS_FAKE_STUB');
        });

        it('they both should throw error', function () {
            role.handleAction.should.throw(Error);
            role.getInitialStateData.should.throw(Error);
        });
    });
});
