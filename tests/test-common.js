var assert = require('chai').assert;

module.exports = {};

/**
 * Uses assert to check that the passed in object follows
 * the role interface
 *
 * @param {object} obj
 */
module.exports.checkRoleInterface = function (obj) {
    // can't check that the constructor takes the args we need it to
    assert.equal(typeof obj.handleAction, 'function');
    assert.notOk(obj.handleAction.IS_FAKE_STUB,
                 'the error-generating method from Role has not been overridden');

    assert.equal(typeof obj.getInitialStateData, 'function');
    assert.notOk(obj.getInitialStateData.IS_FAKE_STUB,
                 'the error-generating method from Role has not been overridden');
};

/**
 * Check (sort of) that the UUID thing works
 */
module.exports.checkRoleUUID = function (Constructor) {
    // empty model (works for now)
    var o1 = new Constructor({});
    var o2 = new Constructor({});

    assert.isDefined(o1.getUUID);
    assert.isDefined(o2.getUUID);

    assert.notEqual(o1.getUUID(), o2.getUUID());
};
