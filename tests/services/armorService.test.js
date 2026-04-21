import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("fs/promises", () => ({ default: { readFile: vi.fn() } }));
import fs from "fs/promises";
import { readArmorFile, allArmors } from "../../services/armorService.js";

const sampleArmors = [
    {
        id: 0,
        name: "Clothes",
        buyPrice: 8,
        sellPrice: 4,
        defense: 1,
        weight: 2,
        accuracy: 0,
        usedBy: [
            "Warrior",
            "Knight",
            "Thief",
            "Ninja",
            "Monk",
            "Master",
            "Red Mage",
            "Red Wizard",
            "Black Mage",
            "Black Wizard",
            "White Mage",
            "White Wizard",
        ],
        locations: ["Cornelia"],
        description: "Ordinary clothing.",
    },
];

describe("armorService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("readArmorFile", () => {
        it("reads and parses armor JSON", async () => {
            fs.readFile.mockResolvedValue(JSON.stringify(sampleArmors));

            const result = await readArmorFile();

            expect(fs.readFile).toHaveBeenCalled();
            expect(result).toEqual(sampleArmors);
        });

        it("logs an error and returns undefined when reading fails", async () => {
            const consoleError = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            fs.readFile.mockRejectedValue(new Error("read failed"));

            await expect(readArmorFile()).rejects.toThrow("read failed");

            expect(consoleError).toHaveBeenCalledWith(
                "Issue reading file",
                "read failed",
            );
            consoleError.mockRestore();
        });
    });

    describe("allArmors", () => {
        it("returns armor list from allArmors", async () => {
            fs.readFile.mockResolvedValue(JSON.stringify(sampleArmors));

            const result = await allArmors();

            expect(result).toEqual(sampleArmors);
        });

        it("logs an error and returns undefined when error is thrown", async () => {
            const consoleError = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            fs.readFile.mockRejectedValue(new Error("method call failed"));

            const result = await allArmors();

            expect(result).toBeUndefined();
            expect(consoleError).toHaveBeenCalledWith(
                "Something went wrong",
                "method call failed",
            );
            consoleError.mockRestore();
        });
    });
});
