'use strict'

const setupDatabase = require('./pVerse-db/lib/db')
const setupAgentModel = require('./pVerse-db/models/agent')
const setupMetricModel = require('./pVerse-db/models/metric')
const setupAgent = require('./pVerse-db/lib/agent')
const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Agent = setupAgent(AgentModel)
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
