import { Application, Request, Response } from "express";
require('module-alias/register');
require('dotenv').config()
const express = require("express")
const bearerToken = require("express-bearer-token");
const AuthMiddleware = require("./app/middleware/auth");

const UserListener = require("./app/listeners/user")
const WorkspaceListener = require("./app/listeners/workspace")
const TodoListener = require("./app/listeners/todo")
const TodoDetailsListener = require("./app/listeners/todoDetails")

const app: Application = express();
const cors = require("cors");

app.use(cors());
app.use(bearerToken());
app.use(express.json());

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));

app.post("/login", (req: Request, res: Response) => UserListener.login(req, res) )
app.get("/workspaces", AuthMiddleware,  (req: Request, res: Response) => WorkspaceListener.getAll(req, res) )
app.post("/workspaces", AuthMiddleware,  (req: Request, res: Response) => WorkspaceListener.create(req, res) )
app.post("/workspaces/update", AuthMiddleware,  (req: Request, res: Response) => WorkspaceListener.update(req, res) )
app.post("/workspaces/destroy", AuthMiddleware,  (req: Request, res: Response) => WorkspaceListener.destroy(req, res) )

app.get("/todos", AuthMiddleware,  (req: Request, res: Response) => TodoListener.getAllByWorkspaceId(req, res) )
app.post("/todos", AuthMiddleware,  (req: Request, res: Response) => TodoListener.create(req, res) )
app.post("/todos/update", AuthMiddleware,  (req: Request, res: Response) => TodoListener.update(req, res) )
app.post("/todos/destroy", AuthMiddleware,  (req: Request, res: Response) => TodoListener.destroy(req, res) )

app.get("/tododetails", AuthMiddleware,  (req: Request, res: Response) => TodoDetailsListener.getAllByTodoId(req, res) )
app.post("/tododetails", AuthMiddleware,  (req: Request, res: Response) => TodoDetailsListener.create(req, res) )
app.post("/tododetails/update", AuthMiddleware,  (req: Request, res: Response) => TodoDetailsListener.update(req, res) )
app.post("/tododetails/destroy", AuthMiddleware,  (req: Request, res: Response) => TodoDetailsListener.destroy(req, res) )

