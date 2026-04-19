"use strict"

import express from "express";
import { allArmors } from "../services/armorService.js";


export async function getAllArmors(req, res) {
    try {
        const armors = await allArmors();
        res.status(200).json(armors);
    } catch (error) {
        console.error("Something went wrong", error.message);
    }
}