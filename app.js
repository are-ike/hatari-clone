const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

async function main() {
  await prisma.project.deleteMany();

  const projects = await prisma.project.createMany({
    data: [
      {
        name: "Project 1",
        description: "try everything",
      },
      { name: "Project 2", description: "try everything" },
      { name: "Project 9", description: "try everything" },
      { name: "Project 10", description: "try everything" },
      { name: "Project 1kkk", description: "try everything" },
    ],
  });
}

main().catch((e) => console.log(e));

//PROJECTS

//Get projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    const reversedProjects = projects.reverse();
    res.status(200).json(reversedProjects);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

//Get a project
app.get("/projects/:id", async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
    } else {
      res.status(200).json(project);
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

//Create a project
app.post("/projects", async (req, res) => {
  const { name, description } = req.body;

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
      },
    });

    const response = {
      message: "success",
      project,
    };

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

//Update project
app.put("/projects/:id", async (req, res) => {
  const data = req.body;

  try {
    const project = await prisma.project.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...data,
      },
    });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
    } else {
      const response = {
        message: "success",
        project,
      };

      res.status(200).json(response);
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

//Delete a project
app.delete("/projects/:id", async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
    } else {
      await prisma.project.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: "Project deleted" });
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

//EVENTS

//Get events

//Get an event

const port = process.env.PORT || 8000;
app.listen(port);
