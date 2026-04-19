"use strict";

import express from "express";
import spellRouter from "./routes/spellRouter.js";
import armorRouter from "./routes/armorRouter.js";
import weaponRouter from "./routes/weaponRouter.js";

const app = express();
const port = 8080;

app.use(express.static("./public"));

app.use("/api/spells", spellRouter);
app.use("/api/armors", armorRouter);
app.use("/api/weapons", weaponRouter);

app.get("/api/items", (req, res) => {
    res.status(200).json({
        message: "TODO: Implement items route",
    });
});

app.get("/api/chests", (req, res) => {
    res.status(200).json({
        message: "TODO: Implement chests route",
    });
});

app.get("/api/monsters", (req, res) => {
    res.status(200).json({
        message: "TODO: Implement monsters route",
    });
});

app.get("/api/locations", (req, res) => {
    res.status(200).json({
        message: "TODO: Implement locations route",
    });
});

app.listen(port, () => console.log(`Serving at http://localhost:${port}`));
