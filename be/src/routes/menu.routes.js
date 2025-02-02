import { Router } from "express"
import { handleGetAllMenu, handleUpdateItemOfMenu, handleAddItemtoMenu, handleDeleteItemFromMenu } from "../controllers/menu.controllers.js"
// import { checkUser } from "../middlewares/userAuth.middlewares.js"

export const menuRoute = Router()

// menuRoute.use(checkUser)

menuRoute.route("/").get(handleGetAllMenu).post(handleAddItemtoMenu)
menuRoute.patch('/:menuId',handleUpdateItemOfMenu)
menuRoute.delete('/:menuId',handleDeleteItemFromMenu)