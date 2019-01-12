const express = require("express")
const bodyParser = require("body-parser")
const { insertWorkout, findAllWorkouts } = require("./database")

const app = express()
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("homepage")
})

app.post("/workout", async (req, res) => {
    const data = req.body
    try {
        const workout = await insertWorkout(data)

        res.send(workout.insertedId)
    } catch (e) {
        res.statusCode(500).send("Internal error")
    }
})

app.get("/workouts/:date", async (req, res) => {
    const date = req.params.date
    try {
        const workouts = await findAllWorkouts({ date })

        res.send(workouts)
    } catch (e) {
        res.statusCode(500).send("Internal error")
    }
})

const port = 3000
app.listen(port, () => console.log("listening on port 3000"))
