import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAllArmors } from "../../controllers/armorsController.js";
import * as armorService from "../../services/armorService.js";

vi.mock("../../services/armorService.js");

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

describe("armorsController", () => {
    let req, res;

    beforeEach(() => {
        vi.clearAllMocks();
        req = {};
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
    });

    describe("getAllArmors", () => {
        it("returns armors with 200 status", async () => {
            armorService.allArmors.mockResolvedValue(sampleArmors);
    
            await getAllArmors(req, res);
    
            expect(armorService.allArmors).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(sampleArmors);
        });
    
        it("logs error when service fails", async () => {
            const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
            armorService.allArmors.mockRejectedValue(new Error("service error"));
    
            await getAllArmors(req, res);
    
            expect(consoleError).toHaveBeenCalledWith("Something went wrong", "service error");
            consoleError.mockRestore();
        });
    });
});