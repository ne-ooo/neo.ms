'use strict'

const api = require('../index.cjs')
const ms = api.default

Object.assign(ms, api)

module.exports = ms
