const express = require('express')
/* eslint-disable no-unused-vars */
const models = require('./models')
const expressGraphQL = require('express-graphql')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const schema = require('./schema/schema')
const chalk = require('chalk')

const app = express()

const MONGO_URI = `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_HOST}`
const OPTIONS = {
    useMongoClient: true,
    autoReconnect: true,
}

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI, OPTIONS)
    .then(() => {
        console.log('Connected to MongoLab instance.')
        console.log(chalk.blue('App URL: http://localhost:4000/#/'))
        console.log(chalk.blue('GraphQL: http://localhost:4000/graphql'))
    },
    error => {
        console.log(`Error connecting to MongoLab: ${error}`)
    })

app.use(bodyParser.json())
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
}))

const webpackMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
app.use(webpackMiddleware(webpack(webpackConfig)))

module.exports = app
