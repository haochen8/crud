/**
 * @file Defines the Snippet Model.
 * @module SnippetModel
 * @author Hao Chen
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

// Create a schema.
const schema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

schema.add(BASE_SCHEMA)

// Create a model using the schema.
export const SnippetModel = mongoose.model('Snippet', schema)
