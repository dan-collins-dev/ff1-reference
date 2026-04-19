"use strict"

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const weaponsFile = path.join(__dirname, "..", "data", "weapons.json");

export async function readWeaponFile() {
    try {
        const allArmors = await fs.readFile(armorsFile);
        return JSON.parse(allArmors);
    } catch (error) {
        console.error("Issue reading file ", error.message)
    }
}

export async function allWeapons() {
    try {
        const allArmors = await readWeaponFile()
        return allArmors
    } catch (error) {
        console.error("Something went wrong", error.message)
    }
}