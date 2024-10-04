/**
 * @file Defines isAuthenticated middleware.
 * @module isAuthenticated
 * @author Hao Chen
 */

/**
 * Checks if a user is authenticated.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} This function does not return a value; it either calls next() or sends a response.
 */
export function isAuthenticated (req, res, next) {
  if (req.session && req.session.userId) {
    return next()
  } else {
    res.status(403).send('You must be logged in to access this page.')
  }
}
