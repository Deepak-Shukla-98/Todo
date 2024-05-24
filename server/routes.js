import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

export const getTasks = async (req, res) => {
  try {
    const alltasks = await prisma.task.findMany();
    const data = alltasks.map((d) => {
      const { body, status, id } = d;
      return { body, status, id };
    });
    res.json(data).status(200);
  } catch (error) {
    res.json(error.message).status(500);
  }
};
export const postTasks = async (req, res) => {
  try {
    const { status, body } = req.body;
    console.log({ status, body });
    const task = await prisma.task.create({
      data: {
        body,
        status: eval(status),
      },
    });
    res.json(task).status(200);
  } catch (error) {
    res.json(error.message).status(500);
  }
};
export const updateTasks = async (req, res) => {
  try {
    const { id, status, body } = req.body;

    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: { status, body },
    });
    console.log({ task, data: { id, status, body } });
    res.json(task).status(200);
  } catch (error) {
    res.json(error.message).status(500);
  }
};
export const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.delete({
      where: {
        id: id,
      },
    });
    res.json(task).status(200);
  } catch (error) {
    res.json(error.message).status(500);
  }
};
router.get("/tasks", getTasks);
router.post("/tasks", postTasks);
router.put("/tasks", updateTasks);
router.delete("/tasks/:id", deleteTasks);

export default router;
