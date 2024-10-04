/**
 * @file Defines the SnippetController class.
 * @module SnippetController
 * @author Hao Chen
 */

import { SnippetModel } from '../models/SnippetModel.js'

/**
 * Encapsulates a controller.
 */
export class SnippetController {
  /**
   * Provide req.doc to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the snippet to load.
   */
  async loadSnippetDocument (req, res, next, id) {
    try {
      // Get the snippet document.
      const snippetDoc = await SnippetModel.findById(id)
      // If the snippet document is not found, throw an error.
      if (!snippetDoc) {
        const error = new Error('The snippet you requested does not exist.')
        error.status = 404
        throw error
      }
      // Provide the snippet document to req.
      req.doc = snippetDoc
      // Next middleware.
      next()
    } catch (error) {
      console.error('Error in loadSnippetDocument:', error)
      next(error)
    }
  }

  /**
   * Displays a list of all snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const snippets = await SnippetModel.find()
      const viewData = {
        snippets: snippets.map(snippetDoc => snippetDoc.toObject())
      }
      res.render('snippets/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Returns a HTML form for creating a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async create (req, res) {
    res.render('snippets/create')
  }

  /**
   * Creates a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async createPost (req, res) {
    try {
      const { description, done } = req.body
      // Get the user ID from the session.
      const userId = req.session.userId

      if (!userId) {
        throw new Error('You must be logged in to create a snippet.')
      }

      await SnippetModel.create({
        description,
        done: done === 'on',
        user: userId
      })

      req.session.flash = { type: 'success', text: 'The snippet was created successfully.' }
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./create')
    }
  }

  /**
   * Returns a HTML form for updating a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async update (req, res) {
    try {
      res.render('snippets/update', { viewData: req.doc.toObject() })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Updates a specific snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {void} This function does not return a value.
   */
  async updatePost (req, res) {
    try {
      // Check if the user is authorized to update the snippet.
      if (req.doc.user.toString() !== req.session.userId) {
        req.session.flash = { type: 'danger', text: 'You are not authorized to update this snippet.' }
        return res.status(403).redirect('..')
      }

      // Proceed with updating the snippet if the user is authorized.
      if ('description' in req.body) req.doc.description = req.body.description
      if ('done' in req.body) req.doc.done = req.body.done === 'on'

      if (req.doc.isModified()) {
        await req.doc.save()
        req.session.flash = { type: 'success', text: 'The snippet was updated successfully.' }
      } else {
        req.session.flash = { type: 'info', text: 'The snippet was not updated because there was nothing to update.' }
      }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./update')
    }
  }

  /**
   * Returns a HTML form for deleting a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async delete (req, res) {
    try {
      res.render('snippets/delete', { viewData: req.doc.toObject() })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Deletes the specified snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {void} This function does not return a value.
   */
  async deletePost (req, res) {
    try {
      // Check if the user is authorized to delete the snippet.
      if (req.doc.user.toString() !== req.session.userId) {
        req.session.flash = { type: 'danger', text: 'You are not authorized to delete this snippet.' }
        return res.status(403).redirect('..')
      }
      // Proceed with deleting the snippet if the user is authorized.
      await req.doc.deleteOne()

      req.session.flash = { type: 'success', text: 'The snippet was deleted successfully.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./delete')
    }
  }
}
