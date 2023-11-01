const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Joi = require("joi");
const {
  nodeTypes,
  useOperators,
  defaultActions,
  conditions,
} = require("./constants");

const app = express();
app.use(express.json());
app.use(cors());

const itemCount = 10;

const schema = Joi.object({
  transaction: Joi.object({
    id: Joi.string().required(),
    time: Joi.date().required(),
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    type: Joi.string().required(),
    gateway: Joi.string().required(),
  }),
  user: Joi.object({
    id: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    mobile: Joi.number().integer().required(),
  }),
  sender: Joi.object({
    id: Joi.string().required(),
    account_name: Joi.string().required(),
    bank_name: Joi.string().required(),
    account_number: Joi.string().required(),
    country: Joi.string().required(),
  }),
  receiver: Joi.object({
    id: Joi.string().required(),
    account_name: Joi.string().required(),
    bank_name: Joi.string().required(),
    account_number: Joi.string().required(),
    country: Joi.string().required(),
  }),
  device: Joi.object({
    ip_address: Joi.string().required(),
    device_id: Joi.string().required(),
    type: Joi.string().required(),
    os: Joi.string().required(),
  }),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  }),
});

async function main() {
  await prisma.project.deleteMany();
  await prisma.event.deleteMany();

  // const projects = await prisma.project.createMany({
  //   data: [
  //     {
  //       name: "Project 1",
  //       description: "try everything",
  //     },
  //     { name: "Project 2", description: "try everything" },
  //     { name: "Project 9", description: "try everything" },
  //     { name: "Project 10", description: "try everything" },
  //     { name: "Project 1kkk", description: "try everything" },
  //   ],
  // });
}

main().catch((e) => console.log(e));

//PROJECTS
app.get("/me/:id", async (req, res) => {
  console.log(req.params.id, 1);
  try {
    if(req.params.id == 1) {
      res.json('yh').status(200)
      
    } else{

      res.json('no').status(200)
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});
//Get projects
app.get("/projects", async (req, res) => {
  try {
    const { page, query } = req.query;

    const projects = await prisma.project.findMany({
      skip: parseInt(page - 1) * itemCount,
      take: itemCount,
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = {
      projects,
      totalPages: Math.ceil(projects.length / itemCount),
      currentPage: page,
      hasProjects: !!(await prisma.project.findMany()).length,
    };
    res.status(200).json(response);
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

    if (project) {
      await prisma.project.update({
        where: {
          id: project.id,
        },
        data: {
          project_url: `${process.env.BASE_URL}/events/${project.id}`,
        },
      });

      const response = {
        message: "success",
        project,
      };

      res.status(200).json(response);
    } else {
      res.status(500).json({ message: "Unable to create project" });
    }
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

//WEBHOOK
app.post("/:id/events", async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
    } else {
      //Set project status to connected
      await prisma.project.update({
        where: {
          id: req.params.id,
        },
        data: {
          status: true,
        },
      });

      if (!project.webhook) {
        res.json({ message: "No webhook added" }).status(400);
      } else if (!project.nodes) {
        res.json({ message: "Invalid workflow" }).status(400);
      } else {
        //validate graph
        const graph = JSON.parse(project.nodes);

        const rules = graph.nodes.filter(
          (node) => node.type === nodeTypes.rule
        )[0].data.rules;
        const action = graph.nodes.filter(
          (node) => node.type === nodeTypes.action
        )[0].data.action;
        // const isCustom = graph.nodes.filter(
        //   (node) => node.type === nodeTypes.action
        // )[0].isCustom;

        if (
          rules.some((rule) => !rule.field) ||
          graph.nodes.length < 3 ||
          !action ||
          graph.edges.length < 2
        ) {
          res.json({ message: "Invalid workflow" }).status(400);
        } else {
          //create event
          const { data } = req.body;
          const event = await prisma.event.create({
            data: {
              ...data,
              project_id: project.id,
            },
          });

          //decision engine
          let result = "";
          for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];

            currentResult = useOperators(
              event[rule.field],
              rule.value,
              rule.operator
            );

            result += `${currentResult}${
              rule.condition ? conditions[rule.condition] : ""
            }`;
          }

          //update event table
          const updatedEvent = await prisma.event.update({
            where: {
              id: event.id,
            },
            data: {
              status: true,
              action: eval(result) ? action : defaultActions.block,
            },
          });

          //send result
          const payload = {
            event_id: updatedEvent.id,
            transaction_id: updatedEvent.transaction_id,
            transaction_type: updatedEvent.transaction_type,
            action: updatedEvent.action,
          };

          await sendEventResult(project.webhook, payload);

          res.status(200).json({ message: "Event received" });
        }
      }
    }
  } catch (error) {
    res.json(error).status(400);
  }
});

//EVENTS
//Get events
app.get("/:id/events", async (req, res) => {
  try {
    const { page } = req.query;

    const events = await prisma.event.findMany({
      skip: parseInt(page - 1) * itemCount,
      take: itemCount,
      where: {
        project_id: req.params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = {
      events,
      totalPages: Math.ceil(events.length / itemCount),
      currentPage: page,
    };

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

//Get an event
app.get("/:id/:eventId", async (req, res) => {
  try {
    const { id, eventId } = req.params;
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
        project_id: id,
      },
    });

    if (!event) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json(event);
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});


async function sendEventResult(webhook, data) {
  try {
    const response = await axios.post(webhook, data);
    return response.data;
  } catch (e) {
    return e;
  }
}

const port = process.env.PORT || 8000;
app.listen(port);
