'use strict'

const { DATE } = require("sequelize")

const agent={
    id:1,
    uuid:'yyy-yyy-yyy',
    name:'fixture',
    username:'pverse',
    hostname:'pverse-host',
    pid:0,
    connected:true,
    createdAt: new Date(),
    updatedAt: new DATE()
}

const agents =[
    agent,
    extend(agent,{id:2,uuid:'yyy-yyy-yyw',connected:true,username:'test'}),
    extend(agent,{id:3,uuid:'yyy-ttt-yyw',connected:false,username:'test'}),
    extend(agent,{id:4,uuid:'ttt-yyy-yyw',connected:true,username:'test'})
]

function extend(obj,values){
    const clone = Object.assign({},obj)
    return Object.assign(clone,values)
}
module.exports ={
    single:agent,
    all:agents,
    connected:agents.filter(t=>t.connected),
    pverse:agents.filter(t=>t.username==='test'),
    byUuid: id=> agents.filter(t =>t.uuid===uuid).shift(),
    byId:id=>agents.filter(t=>t.id===id).shift()
}