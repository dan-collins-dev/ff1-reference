"use strict"

import express from "express";
import { getAllSpells, getSpellByName } from "../controllers/spellsController.js";

const spellRouter = express.Router();

spellRouter.get("/", getAllSpells);
spellRouter.get("/:name", getSpellByName);

export default spellRouter;