const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const port = 5500;

const router = require("./src/routes/routes");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World test");
});
app.use("/api/v1/", router);

app.listen(port, () => {
    console.log(`App runing on port ${port}`);
});
