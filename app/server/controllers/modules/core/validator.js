module.exports = function () {
    var items = [];
    var invalidResults = [];

    var add = function (item) {
        items.push(item);
        return this;
    };

    var success = function (cb) {
        if (invalidResults.length === 0) {
            cb();
        }
        return this;
    };

    var error = function (cb) {
        if (invalidResults.length > 0) {
            cb(invalidResults);
        }
        return this;
    };

    var validate = function () {
        invalidResults = [];
        items.forEach(function (element) {
            var type = element.type;
            var value = element.value;
            var msg = element.msg;
            var min = element.min || 0;
            var max = element.max || Number.MAX_SAFE_INTEGER;
            switch (type) {
                case 'number':
                    if (isNaN(value)) {
                        invalidResults.push(msg);
                    }
                    break;

                case 'length':
                    if (value && (value.length < min || value.length > max)) {
                        invalidResults.push(msg);
                    }
                    break;
                case 'require':
                    if (value === undefined || value === null || value.length === 0) {
                        invalidResults.push(msg);
                    }
                    break;

                default:
                    break;
            }
        });
        return this;
    };
    return {
        add: add,
        success: success,
        error: error,
        validate: validate
    };
};