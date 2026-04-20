"use strict";

import express from "express";
import { allSpells, spellByName } from "../services/spellService.js";

export async function getAllSpells(req, res) {
    try {
        const spells = await allSpells();
        res.status(200).json(spells);
    } catch (error) {
        console.error("Something went wrong", "getAllSpells failed");
    }
}

export async function getSpellByName(req, res) {
    try {
        const spell = await spellByName(req.params.name);

        if (Object.keys(spell).length === 0) {
            return res.status(404).json({
                message: `${req.params.name} does not exist.`,
            });
        }

        res.status(200).json(spell);
    } catch (error) {
        console.error("Something went wrong", "getSpellByName failed");
    }
}
