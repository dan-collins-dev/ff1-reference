import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("fs/promises", () => ({ default: { readFile: vi.fn() } }));
import fs from "fs/promises";
import { readWeaponFile, allWeapons } from "../../services/weaponService.js";

const sampleWeapons = [
    {
        id: 0,
        name: "Nunchaku",
        buyPrice: 8,
        sellPrice: 4,
        attack: 12,
        accuracy: 0,
        usedBy: ["Ninja", "Monk", "Master"],
        locations: ["Cornelia"],
        description: "Wooden nunchaku.",
    },
];

describe("weaponService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("readWeaponFile", () => {
        it("reads and parses weapon JSON", async () => {
            fs.readFile.mockResolvedValue(JSON.stringify(sampleWeapons));

            const result = await readWeaponFile();

            expect(fs.readFile).toHaveBeenCalled();
            expect(result).toEqual(sampleWeapons);
        });

        it("logs an error and returns undefined when reading fails", async () => {
            const consoleError = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            fs.readFile.mockRejectedValue(new Error("read failed"));

            await expect(readWeaponFile).rejects.toThrow("read failed");

            expect(consoleError).toHaveBeenCalledWith(
                "Issue reading file",
                "read failed",
            );
            consoleError.mockRestore();
        });
    });

    describe("allWeapons", () => {
        it("returns weapons list from allWeapons", async () => {
            fs.readFile.mockResolvedValue(JSON.stringify(sampleWeapons));

            const result = await allWeapons();

            expect(result).toEqual(sampleWeapons);
        });

        it("logs an error and returns undefined when error is thrown", async () => {
            const consoleError = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            fs.readFile.mockRejectedValue(new Error("method call failed"));

            const result = await allWeapons();

            expect(result).toBeUndefined();
            expect(consoleError).toHaveBeenCalledWith(
                "Something went wrong",
                "method call failed",
            );
            consoleError.mockRestore();
        });
    });
});
