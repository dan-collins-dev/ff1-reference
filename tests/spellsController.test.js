import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAllSpells, getSpellByName } from "../controllers/spellsController.js";
import * as spellService from "../services/spellService.js";

vi.mock("../services/spellService.js");

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

describe("spellsController", () => {
    let req, res;

    beforeEach(() => {
        vi.clearAllMocks();
        req = {};
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
    });

    describe("getAllSpells", () => {
        it("returns spells with 200 status", async () => {
            spellService.allSpells.mockResolvedValue(sampleSpells);

            await getAllSpells(req, res);

            expect(spellService.allSpells).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(sampleSpells);
        });

        it("logs error when service fails", async () => {
            const consoleError = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            spellService.allSpells.mockRejectedValue(
                new Error("Something went wrong"),
            );

            await getAllSpells(req, res);

            expect(consoleError).toHaveBeenCalledWith(
                "Something went wrong",
                "getAllSpells failed",
            );
            consoleError.mockRestore();
        });
    });

    describe("getSpellByName", () => {
        it("returns spell with 200 status when spell exists", async () => {
            req = { params: { name: "Fire" } };
            spellService.spellByName.mockResolvedValue([sampleSpells[0]]);

            await getSpellByName(req, res);

            expect(spellService.spellByName).toHaveBeenCalledWith("Fire");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([sampleSpells[0]]);
        });

        it("returns 404 status when spell does not exist", async () => {
            req = { params: { name: "NonexistentSpell" } };
            spellService.spellByName.mockResolvedValue([]);

            await getSpellByName(req, res);

            expect(spellService.spellByName).toHaveBeenCalledWith("NonexistentSpell");
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({message: "NonexistentSpell does not exist."});
        });

        it("logs error when service fails", async () => {
            const consoleError = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            const result = spellService.allSpells.mockRejectedValue(
                new Error("Something went wrong"),
            );

            await getSpellByName(req, res);

            expect(consoleError).toHaveBeenCalledWith("Something went wrong", "getSpellByName failed");
            consoleError.mockRestore();
        });
    });
});