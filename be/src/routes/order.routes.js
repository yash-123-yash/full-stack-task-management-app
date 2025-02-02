import { Router } from "express";
import { checkUser } from "../middlewares/userAuth.middlewares.js";
import { handleAllGetOrder, handleCreateOrder, handleGetOrderById } from "../controllers/order.controllers.js";

export const orderRoute = Router();

orderRoute.use(checkUser)

orderRoute.route("/").post(handleCreateOrder).get(handleAllGetOrder)
orderRoute.route("/:orderId").get(handleGetOrderById)