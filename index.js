const { response } = require("express");
const express = require("express");
const { read, readFile } = require("fs").promises;
const { request } = require("http");

const app = express();
//Request - User's Incoming Data Response - Server Outgoing Data
app.get("/", async(request, response) => {

    response.send( await readFile("./index.html", "utf-8") );
});

app.listen(process.env.PORT || 3000, () => console.log("http://localhost:3000"))
