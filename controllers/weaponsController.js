"use strict"

import express from "express";
import { allWeapons } from "../services/weaponService.js";


export async function getAllWeapons(req, res) {
    try {
        const weapons = await allWeapons();
        res.status(200).json(weapons);
    } catch (error) {
        console.error("Something went wrong", error.message);
    }
}