"use strict"

import express from "express";
import { allSpells } from "../services/spellService.js";


export async function getAllSpells(req, res) {
    try {
        const spells = await allSpells();
        res.status(200).json(spells);
    } catch (error) {
        console.error("Something went wrong", error.message);
    }
}