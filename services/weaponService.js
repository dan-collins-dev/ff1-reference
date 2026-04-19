"use strict"

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const weaponsFile = path.join(__dirname, "..", "data", "weapons.json");

export async function readWeaponFile() {
    try {
        const allWeapons = await fs.readFile(weaponsFile);
        return JSON.parse(allWeapons);
    } catch (error) {
        console.error("Issue reading file", error.message);
    }
}

export async function allWeapons() {
    try {
        const allWeapons = await readWeaponFile();
        return allWeapons;
    } catch (error) {
        console.error("Something went wrong", error.message);
    }
}