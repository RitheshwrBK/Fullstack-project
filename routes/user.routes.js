import { Router } from "express";

import authorize from '../middlewares/auth.middleware.js'

import { getUsers, getUser } from '../controllers/user.controller.js';   

const userRouter = Router();

userRouter.get('/', authorize, getUsers);

userRouter.get('/:id', authorize ,getUser);

userRouter.post('/',(req,res) => res.send({title : "Create new user"}));

userRouter.put('/:id',(req,res) => res.send({title : "Update user info"}));

userRouter.delete('/:id',(req,res) => res.send({title : "DELETE that user ID"}));

export default userRouter;

