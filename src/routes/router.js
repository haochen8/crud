/**
 * @file Defines the main router.
 * @module router
 * @author Hao Chen
 */

import express from 'express'
import http from 'node:http'
import { router as homeRouter } from './homeRouter.js'
import { router as snippetRouter } from './snippetRouter.js'
import { router as authRouter } from './authRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/snippets', snippetRouter)
router.use('/auth', authRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode
  next(error)
})
