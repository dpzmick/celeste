var assert = require('chai').assert;

/**
 * Uses assert to check that the passed in object follows
 * the role interface
 *
 * @param {object} obj
 */
var checkRoleInterface = function (obj) {
    // can't check that the constructor takes the args we need it to
    assert.equal(typeof obj.handleAction, 'function');
    assert.equal(typeof obj.getInitialStateData, 'function');
};

module.exports = {
    checkRoleInterface: checkRoleInterface
};
