const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`); // req.originalUrl is the url that was requested
    res.status(404);
    next(error);
}


const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // if res.statusCode is 200, set statusCode to 500, else set statusCode to res.statusCode
    const message = err.message;

    if(err.name === "CastError" & err.kind === "ObjectId") {
        statusCode = 400;
        message = "Resource not found";
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
}

module.exports = { notFound, errorHandler };
