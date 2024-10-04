/**
 * @file Defines the authenticate router.
 * @module authRouter
 * @author Hao Chen
 */

import express from 'express'
import { UserController } from '../controllers/UserController.js'
import { checkNotAuthenticated } from '../middlewares/checkNotAuthenticated.js'

export const router = express.Router()

const controller = new UserController()

// Map HTTP verbs and route paths to controller action methods and
// Use checkNotAuthenticated middleware on routes where it's needed.

router.get('/register', checkNotAuthenticated, (req, res) => { res.render('auth/register') })
router.get('/login', checkNotAuthenticated, (req, res) => { res.render('auth/login') })

router.post('/register', checkNotAuthenticated, (req, res, next) => controller.register(req, res, next))
router.post('/login', checkNotAuthenticated, (req, res, next) => controller.login(req, res, next))

router.get('/logout', (req, res, next) => controller.logout(req, res, next))
