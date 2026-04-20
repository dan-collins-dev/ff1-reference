import { describe, it, expect, vi, beforeAll } from "vitest";

const useMock = vi.fn();
const getMock = vi.fn();
const listenMock = vi.fn((port, callback) => callback && callback());
const appMock = { use: useMock, get: getMock, listen: listenMock };
let expressMock;

beforeAll(async () => {
    vi.resetModules();
    const expressFn = vi.fn(() => appMock);
    expressFn.static = vi.fn((path) => `static:${path}`);

    vi.doMock("express", () => ({
        default: expressFn,
    }));
    vi.doMock("../routes/spellRouter.js", () => ({ default: "spellRouter" }));
    vi.doMock("../routes/armorRouter.js", () => ({ default: "armorRouter" }));
    vi.doMock("../routes/weaponRouter.js", () => ({ default: "weaponRouter" }));

    expressMock = (await import("express")).default;
    await import("../server.js");
});

describe("server.js", () => {
    it("registers express static middleware and API routers", () => {
        expect(expressMock).toHaveBeenCalledTimes(1);
        expect(expressMock.static).toHaveBeenCalledWith("./public");
        expect(useMock).toHaveBeenCalledWith("static:./public");
        expect(useMock).toHaveBeenCalledWith("/api/spells", "spellRouter");
        expect(useMock).toHaveBeenCalledWith("/api/armors", "armorRouter");
        expect(useMock).toHaveBeenCalledWith("/api/weapons", "weaponRouter");
    });

    it("defines the placeholder API GET endpoints", () => {
        expect(getMock).toHaveBeenCalledWith("/api/items", expect.any(Function));
        expect(getMock).toHaveBeenCalledWith("/api/chests", expect.any(Function));
        expect(getMock).toHaveBeenCalledWith("/api/monsters", expect.any(Function));
        expect(getMock).toHaveBeenCalledWith("/api/locations", expect.any(Function));
    });

    it("starts the server on port 8080", () => {
        expect(listenMock).toHaveBeenCalledWith(8080, expect.any(Function));
    });
});
