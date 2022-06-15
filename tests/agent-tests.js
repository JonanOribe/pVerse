'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const agentFixtures = require('./fixtures/agent')
let id = 1

const config = {
  logging: function () {}
}

let MetricStub = {
    belongsTo: sinon.spy()
}


let single =Object.assign({},agentFixtures.single)
let AgentStub =  null

let db = null
let sandbox = null

test.beforeEach(async () => {
sandbox = sinon.createSandbox()

    AgentStub = {
        hasMany: sandbox.spy()
    }
  const setupDatabase = proxyquire('../',{
    './pVerse-db/models/agent':()=>AgentStub,
    './pVerse-db/models/metric':()=>MetricStub
  })
  db = await setupDatabase(config)
})

test.afterEach(()=>{
    sandbox && sandbox.resetHistory()
})

test('Agent exist', t => {
  t.truthy(db.Agent, 'Agent service should exist')
})

test.serial('Setup',t=>{
    t.true(AgentStub.hasMany.called,'AgentModel.hasMany was executed')
    t.true(AgentStub.hasMany.calledWith(MetricStub),'Argument should be the MetricModel')
    t.true(MetricStub.belongsTo.called,'MetricModel.belongsTo was executed')
    t.true(MetricStub.belongsTo.calledWith(AgentStub),'Argument should to be the AgentModel')
})

test.serial('Agent#findById',async t=>{
    let agent = await db.Agent.findById(id)
    t.deepEqual(agent,agentFixtures.byId(id),'should be the same')
})
