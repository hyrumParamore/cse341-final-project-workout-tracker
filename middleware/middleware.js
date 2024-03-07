
// Middleware function - This is just making the thing work with no errors for now.
const myMiddleware = (req, res, next) => {
  // Do something
  next();
}


module.exports = {
    myMiddleware,
};
