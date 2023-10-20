
const { PrismaClient } = require('@prisma/client') 
const prisma = new PrismaClient()

const express = require('express')
const app = express()


//PROJECTS

//Get projects
app.get('/projects',  (req, res) => {
    res.send('hi')
})

//Get a project

//Create a project

//Delete a project

//Update a project 


//EVENTS

//Get events

//Get an event


//WORKFLOWS

//Get a workflow

//Create a workflow

//Delete a workflow

//Update a workflow 

const port = process.env.PORT || 8000
app.listen(port)