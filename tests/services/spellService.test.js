import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("fs/promises", () => ({ default: { readFile: vi.fn() } }));
import fs from "fs/promises";
import {
    readSpellFile,
    allSpells,
    spellByName,
} from "../../services/spellService.js";

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

    describe("readSpellFile", () => {
        it("reads and parses spell JSON", async () => {
            fs.readFile.mockResolvedValue(JSON.stringify(sampleSpells));

            const result = await readSpellFile();

            expect(fs.readFile).toHaveBeenCalled();
            expect(result).toEqual(sampleSpells);
        });

        it("logs an error and returns undefined when reading fails", async () => {
            const consoleError = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            fs.readFile.mockRejectedValue(new Error("read failed"));

            await expect(readSpellFile()).rejects.toThrow("read failed");

            expect(consoleError).toHaveBeenCalledWith(
                "Issue reading file",
                "read failed",
            );
            consoleError.mockRestore();
        });
    });

    describe("allSpells", () => {
        it("returns spell list from allSpells", async () => {
            fs.readFile.mockResolvedValue(JSON.stringify(sampleSpells));

            const result = await allSpells();

            expect(result).toEqual(sampleSpells);
        });

        it("logs an error and returns undefined when allSpells fails", async () => {
            const consoleError = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            fs.readFile.mockRejectedValue(new Error("method call failed"));

            const result = await allSpells();

            expect(result).toBeUndefined();
            expect(consoleError).toHaveBeenCalledWith(
                "Something went wrong",
                "method call failed",
            );
            consoleError.mockRestore();
        });
    });

    describe("spellByName", () => {
        it("should return an existing spell", async () => {
            fs.readFile.mockResolvedValue(JSON.stringify(sampleSpells));

            const result = await spellByName("fire");

            expect(result).toBeDefined(result);
        });

        it("should return an empty array when a spell does not exist", async () => {
            fs.readFile.mockResolvedValue(JSON.stringify(sampleSpells));

            const result = await spellByName("Hotdog");

            expect(result).toStrictEqual([]);
        });

        it("logs an error and returns undefined on failure", async () => {
            const consoleError = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            fs.readFile.mockRejectedValue(new Error("spell lookup failed"));

            const result = await spellByName("SomeSpell");

            expect(result).toBeUndefined();
            expect(consoleError).toHaveBeenCalledWith(
                "Something went wrong",
                "spell lookup failed",
            );
            consoleError.mockRestore();
        });
    });
});
