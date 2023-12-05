import express from "express";
import userController from "../controllers/user.js";
import accountController from "../controllers/account.js";
import { validateAccount, verifySession } from "../middlewares/account.js";

const route = express.Router();

route.use('/users', [verifySession])
/// registro
route.post("/account", [validateAccount], accountController.createAccount);
/// login
/// /auth/login
route.post("/session", [validateAccount], accountController.login);
route.delete("/session", [verifySession], accountController.logout);
route.get("/users", userController.getUsers);
route.get("/user/:id", userController.getUserById);
route.put("/user/:id", userController.updateUser);
route.delete("/user/:id", userController.deleteUser);

export default route;

//CRUD of the users

//  route.post('/users', [validateCreateUser], userController.createUser)
//route.post('/users/register', register)
// route.post('/users/login', login)
