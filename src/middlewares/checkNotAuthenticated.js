/**
 * @file Defines checkNotAuthenticated middleware.
 * @module checkNotAuthenticated
 * @author Hao Chen
 */

/**
 * Checks if a user is logged in.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} This function does not return a value; it either calls next() or sends a response.
 */
export function checkNotAuthenticated (req, res, next) {
  if (req.session.userId) {
    return res.redirect('/')
  }
  next()
}
