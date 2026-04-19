"use strict"

import express from "express";
import { getAllArmors } from "../controllers/armorsController.js";

const armorRouter = express.Router();

armorRouter.get("/", getAllArmors);

export default armorRouter;