module.exports = function () {
    let items = [];
    let invalidResults = [];

    let add = (item) => {
        items.push(item);
        return this;
    };

    let success = (cb) => {
        if (invalidResults.length === 0) {
            cb();
        }
        return this;
    };

    let error = (cb) => {
        if (invalidResults.length > 0) {
            cb(invalidResults);
        }
        return this;
    };

    let validate = () => {
        invalidResults = [];
        items.forEach(element => {
            let type = element.type;
            let value = element.value;
            let msg = element.msg;
            let min = element.min || 0;
            let max = element.max || Number.MAX_SAFE_INTEGER;
            switch (type) {
                case 'number':
                    if (isNaN(value)) {
                        invalidResults.push(msg);
                    }
                    break;
                case 'array':
                    if (!value || (value && value.length === 0)) {
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