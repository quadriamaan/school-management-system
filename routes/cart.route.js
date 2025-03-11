import { Router } from "express";
import { createcart,getallcartdetails,getcart } from "../controllers/cart.controller.js";

const cartrouter = Router()

cartrouter.route('/').post(createcart)
cartrouter.route('/:id').get(getcart)
cartrouter.route('/').get(getallcartdetails)

export {cartrouter}