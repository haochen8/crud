/**
 * @file Defines the UserController class.
 * @module UserController
 * @author Hao Chen
 */

import { UserModel } from '../models/UserModel.js'

/**
 * Encapsulates a controller.
 */
export class UserController {
  /**
   * Handles user registration.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async register (req, res, next) {
    try {
      // Get the username and password from the request body.
      const { username, password } = req.body

      // Check if the username is already taken.
      const existingUser = await UserModel.findOne({ username })
      if (existingUser) {
        req.session.flash = { type: 'danger', text: 'The username is already taken.' }
        return res.redirect('/snippetapp/auth/register')
      }

      // Create a new user.
      const user = new UserModel({ username, password })
      await user.save()

      // Automatically log in the user after registration.
      req.session.userId = user._id

      // Redirect to the home page.
      req.session.save(() => res.redirect('/'))
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('/snippetapp/auth/register')
    }
  }

  /**
   * Handles user login.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async login (req, res, next) {
    try {
      const { username, password } = req.body
      const user = await UserModel.authenticate(username, password)

      // If authentication is successful, save the user ID to the session.
      req.session.userId = user._id
      return res.redirect('/')
    } catch (error) {
      // If authentication fails, redirect the user to the login page.
      req.session.flash = { type: 'danger', text: error.message }
      return res.redirect('/snippetapp/auth/login')
    }
  }

  /**
   * Handles user logout.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async logout (req, res) {
    // Destroy the user session.
    req.session.destroy((err) => {
      if (err) {
        return res.redirect('/snippetapp/')
      }
      res.clearCookie('sid')
      res.redirect('/snippetapp/')
    })
  }
}
