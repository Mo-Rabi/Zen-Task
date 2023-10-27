import { assert } from "console";
import taskModel from "../../db/model/task.model.js";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth.js";
import { stat } from "fs";

//! Create a new Task
const addTask = async (req, res) => {
  console.log(req.body);
  try {
    let { title, description, assignTo, status, deadline, priority, authorId } =
      req.body;
    const currentDate = new Date();
    let deadlineDate = new Date(deadline);
    let isOverdue = deadlineDate < currentDate;

    console.log(
      `title:${title}, description:${description}, status:${status}, assign to:${assignTo} deadline:${deadline} isOverdue:${isOverdue}`
    );

    // let { token } = req.cookies;
    // let decodedTokenPayload = jwt.verify(token, "SecretKeyCanBeAnything");
    // let newTaskToken = jwt.sign(
    //   { id: decodedTokenPayload.id },
    //   "secretKeyForNewTask",
    //   { expiresIn: "30d" }
    // );

    // res.cookie(
    //   "newTaskToken",
    //   newTaskToken //?res.cookie(name, value [, options])
    //   //{ httpOnly: true }
    // );
    // let authorId = decodedTokenPayload.id;
    // console.log("Author ID: ", authorId);

    let addedTask = await taskModel.create({
      title,
      description,
      status,
      authorId,
      assignTo,
      deadline,
      isOverdue,
      priority,
    });
    console.log("After added");
    console.log(addedTask);

    //new Signature (jwt.sign()) (create a token that holds the task id (most recently added task))

    res
      .status(201)
      .json({ message: "Your task was added successfully", addedTask });
  } catch (error) {
    console.log("Inside catch");
    res.status(400).json({ message: "An Error happened =>", error });
  }
};

//! Update a Task
const updateTask = async (req, res) => {
  try {
    let { taskId } = req.params;
    let { title, description, taskStatus, assignTo, deadline } = req.body;
    // //                     ******To Do: Recheck the logic******
    // let { newTaskToken } = req.cookies;
    // let decodedToken = jwt.verify(newTaskToken, "secretKeyForNewTask");
    // let authorId = decodedToken.id;

    let updatedTask = await taskModel.findByIdAndUpdate(taskId, {
      title,
      description,
      taskStatus,
      assignTo,
      deadline,
    });
    res
      .status(201)
      .json({ message: "Your task was updated successfully", updatedTask });
  } catch (error) {
    res.status(400).json({ message: "An Error happened =>", error });
  }
};

//! Retrieve all tasks of the current user
const getAllTasks = async (req, res) => {
  console.log(req.body);
  //let { token } = req.cookies;
  //let decodedToken = jwt.verify(token, "SecretKeyCanBeAnything");
  //let authorId = decodedToken.id;
  //console.log(authorId);

  // let allTasks = await taskModel.find({ authorId: authorId });
  let allTasks = await taskModel.find();
  console.log(allTasks);
  Array.from(allTasks);
  res.status(200).json({ message: "Tasks retrieved successfully", allTasks });
};

//! Retrieve all tasks with user data
const tasksWithAuthor = async (req, res) => {
  let data = await taskModel.find().populate("authorId");
  res.json({ message: "All tasks with Author ID field populated", data });
};

//! Delete a task
const deleteTask = async (req, res) => {
  let { taskId } = req.params;
  console.log(taskId);
  let deletedTask = await taskModel.findByIdAndDelete(taskId);
  res.json({ message: "Task was deleted successfully", deletedTask });
};

export { addTask, updateTask, getAllTasks, deleteTask, tasksWithAuthor };
