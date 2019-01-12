const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

app.get("/", (req, res) => [res.send("homepage")])

const port = 3000
app.listen(port, () => console.log("listening on port 3000"))
