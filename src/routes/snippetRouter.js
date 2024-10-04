/**
 * @file Defines the snippet router.
 * @module snippetRouter
 * @author Hao Chen
 */
// src/routes/snippetRouter.js
import express from 'express'
import { SnippetController } from '../controllers/SnippetController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

export const router = express.Router()

const controller = new SnippetController()

// Provide req.doc to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadSnippetDocument(req, res, next, id))

// Map HTTP verbs and route paths to controller action methods and
// apply the isAuthenticated middleware to the following neccessary routes.
router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/create', isAuthenticated, (req, res, next) => controller.create(req, res, next))
router.post('/create', isAuthenticated, (req, res, next) => controller.createPost(req, res, next))

router.get('/:id/update', isAuthenticated, (req, res, next) => controller.update(req, res, next))
router.post('/:id/update', isAuthenticated, (req, res, next) => controller.updatePost(req, res, next))

router.get('/:id/delete', isAuthenticated, (req, res, next) => controller.delete(req, res, next))
router.post('/:id/delete', isAuthenticated, (req, res, next) => controller.deletePost(req, res, next))
