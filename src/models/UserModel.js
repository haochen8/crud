/**
 * @file Defines the User Model.
 * @module SnippetModel
 * @author Hao Chen
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'
import bcrypt from 'bcrypt'

// Create a schema.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: [3, 'Must be at least 3 characters long.']
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, 'Must be at least 8 characters long.']
  }
}, {
  timestamps: true,
  versionKey: false

})

// Hash the password before saving the user model.
userSchema.pre('save', async function save (next) {
  if (!this.isModified('password')) { return next() }
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

/**
 * Compare the password with the hashed password.
 *
 * @param {string} username - The username to compare.
 * @param {string} password - The password to compare.
 * @returns {Promise} A promise that resolves to true if the password matches, otherwise it rejects.
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  // If the user is not found or the password does not match, throw an error.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password.')
  }
  // Otherwise, return the user.
  return user
}

userSchema.add(BASE_SCHEMA)

// Create a model using the schema.
export const UserModel = mongoose.model('User', userSchema)
