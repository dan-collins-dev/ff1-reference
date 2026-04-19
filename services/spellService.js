"use strict"

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const spellsFile = path.join(__dirname, "..", "data", "spells.json");

export async function readSpellFile() {
    try {
        const allSpells = await fs.readFile(spellsFile);
        return JSON.parse(allSpells);
    } catch (error) {
        console.error("Issue reading file", error.message);
    }
}

export async function allSpells() {
    try {
        const allSpells = await readSpellFile();
        return allSpells;
    } catch (error) {
        console.error("Something went wrong", error.message);
    }
}