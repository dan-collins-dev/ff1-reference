"use strict";

import express from "express";

const app = express();
const port = 8080;

app.get("/", () => {
    res.status(200).json({
        message: "Initial Commit",
    });
});

app.listen(port, () => `Serving at http://localhost:${port}`);