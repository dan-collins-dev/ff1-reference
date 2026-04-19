"use strict"

import express from "express";
import { getAllWeapons } from "../controllers/weaponsController.js";

const weaponRouter = express.Router();

weaponRouter.get("/", getAllWeapons);

export default weaponRouter;