export const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
//# sourceMappingURL=requestLogger.js.map