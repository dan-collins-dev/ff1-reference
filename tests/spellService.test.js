import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("fs/promises", () => ({ default: { readFile: vi.fn() } }));
import fs from "fs/promises";
import { readSpellFile, allSpells } from "../services/spellService.js";

const sampleSpells = [
    {
        id: 0,
        name: "Fire",
        type: "Black",
        price: 50,
        spellLevel: 1,
        usedBy: [
            "Black Mage",
            "Black Wizard",
            "Red Mage",
            "Red Wizard",
            "Ninja",
        ],
        locations: ["Cornelia"],
        description: "Deals fire damage to one enemy.",
    },
];

describe("spellService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("reads and parses spell JSON", async () => {
        fs.readFile.mockResolvedValue(JSON.stringify(sampleSpells));

        const result = await readSpellFile();

        expect(fs.readFile).toHaveBeenCalled();
        expect(result).toEqual(sampleSpells);
    });

    it("returns spell list from allSpells", async () => {
        fs.readFile.mockResolvedValue(JSON.stringify(sampleSpells));

        const result = await allSpells();

        expect(result).toEqual(sampleSpells);
    });

    it("logs an error and returns undefined when reading fails", async () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        fs.readFile.mockRejectedValue(new Error("read failed"));

        const result = await readSpellFile();

        expect(result).toBeUndefined();
        expect(consoleError).toHaveBeenCalledWith("Issue reading file", "read failed");
        consoleError.mockRestore();
    });
});
