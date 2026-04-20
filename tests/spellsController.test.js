import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAllSpells } from "../controllers/spellsController.js";
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

    it("returns spells with 200 status", async () => {
        spellService.allSpells.mockResolvedValue(sampleSpells);

        await getAllSpells(req, res);

        expect(spellService.allSpells).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(sampleSpells);
    });

    it("logs error when service fails", async () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        spellService.allSpells.mockRejectedValue(new Error("service error"));

        await getAllSpells(req, res);

        expect(consoleError).toHaveBeenCalledWith("Something went wrong", "service error");
        consoleError.mockRestore();
    });
});