const Response = (response = {}) => {
    const {
        status = null,
        statusCode = null,
        message = {
            success: Boolean,
            message: ''
        },
        type = null,
        data = {},
        token = null,
        pagination = null
    } = response;

    const responseObject = {
        status: status !== null ? status : null,
        statusCode: statusCode !== null ? statusCode : null,
        message: message || '',
        data: {
            type: type !== null ? type : null,
            attributes: data || {},
            token: token !== null ? token : null
        },
        pagination: pagination !== null ? pagination : null
    };

    // Remove undefined or null values from data object
    if (responseObject.data.type === null) delete responseObject.data.type;
    if (responseObject.data.token === null) delete responseObject.data.token;

    // Remove pagination if not provided
    if (responseObject.pagination === null) delete responseObject.pagination;

    return responseObject;
};

module.exports = Response;