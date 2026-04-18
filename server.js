"use strict";

import express from "express";

const app = express();
const port = 8080;

app.get("/api/items", () => {
    res.status(200).json({
        message: "TODO: Implement items route",
    });
});

app.get("/api/spells", () => {
    res.status(200).json({
        message: "TODO: Implement spells route",
    });
});

app.get("/api/chests", () => {
    res.status(200).json({
        message: "TODO: Implement chests route",
    });
});

app.get("/api/monsters", () => {
    res.status(200).json({
        message: "TODO: Implement monsters route",
    });
});

app.get("/api/locations", () => {
    res.status(200).json({
        message: "TODO: Implement locations route",
    });
});

app.listen(port, () => `Serving at http://localhost:${port}`);
