import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAllWeapons } from "../../controllers/weaponsController.js";
import * as weaponService from "../../services/weaponService.js";

vi.mock("../../services/weaponService.js");

const sampleWeapons = [{ id: 0, name: "Dagger", attack: 5 }];

describe("weaponsController", () => {
    let req, res;

    beforeEach(() => {
        vi.clearAllMocks();
        req = {};
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
    });

    it("returns weapons with 200 status", async () => {
        weaponService.allWeapons.mockResolvedValue(sampleWeapons);

        await getAllWeapons(req, res);

        expect(weaponService.allWeapons).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(sampleWeapons);
    });

    it("logs error when service fails", async () => {
        const consoleError = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});
        weaponService.allWeapons.mockRejectedValue(new Error("service error"));

        await getAllWeapons(req, res);

        expect(consoleError).toHaveBeenCalledWith(
            "Something went wrong",
            "service error",
        );
        consoleError.mockRestore();
    });
});
