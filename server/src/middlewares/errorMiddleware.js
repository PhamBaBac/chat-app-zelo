const errorMiddleware = (error, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: error.message,
        statusCode,
        stack: error.stack,
    });
};

module.exports = errorMiddleware;