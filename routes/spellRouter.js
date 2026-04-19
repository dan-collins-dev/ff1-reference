"use strict"

import express from "express";
import { getAllSpells } from "../controllers/spellsController.js"

const spellRouter = express.Router();


spellRouter.get("/", getAllSpells)

export default spellRouter