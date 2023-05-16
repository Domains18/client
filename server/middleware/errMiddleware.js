const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`); // req.originalUrl is the url that was requested
    res.status(404);
    next(error);
}
