const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const app = express();
app.use(express.json());

async function main() {
  await prisma.project.deleteMany();
  await prisma.workflow.deleteMany();

  const projects = await prisma.project.createMany({
    data: [
      { name: "Project 1" },
      { name: "Project 2" },
      { name: "Project 9" },
      { name: "Project 10" },
      { name: "Project 1kkk" },
      { name: "Project 1lll" },
      { name: "Project 1" },
      { name: "Project 2" },
      { name: "Project 9" },
      { name: "Project 10" },
      { name: "Project 1kkk" },
      { name: "Project 1lll" },
    ],
  });
  const workflows = await prisma.workflow.createMany({
    data: [
      { name: "Project 1" },
      { name: "Project 2" },
      { name: "Project 9" },
      { name: "Project 10" },
      { name: "Project 1kkk" },
      { name: "Project 1lll" },
      { name: "Project 1" },
      { name: "Project 2" },
      { name: "Project 9" },
      { name: "Project 10" },
      { name: "Project 1kkk" },
      { name: "Project 1lll" },
    ],
  });
}

main().catch((e) => console.log(e));

//PROJECTS

//Get projects
app.get("/projects", async (req, res) => {
  const projects = await prisma.project.findMany();
  res.json(projects);
});

//Get a project
app.get("/projects/:id", async (req, res) => {
  const project = await prisma.project.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!project) {
    res.status(404).json({ error: "Project not found" });
  } else {
    res.json(project);
  }
});

//Create a project

//Delete a project

//Update a project

//EVENTS

//Get events

//Get an event

//WORKFLOWS

//Get workflows
app.get("/workflows", async (req, res) => {
  const workflows = await prisma.workflow.findMany();
  res.json(workflows);
});

//Get a workflow
app.get("/workflows/:id", async (req, res) => {
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!workflow) {
    res.status(404).json({ error: "Workflow not found" });
  } else {
    res.json(workflow);
  }
});

//Create a workflow

//Delete a workflow

//Update a workflow

const port = process.env.PORT || 8000;
app.listen(port);
