const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const {
    insertWorkout,
    findAllWorkouts,
    findAllExercises,
    insertExercise,
} = require("./database")

const app = express()
app.use(bodyParser.json())
app.use(cors())

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

app.get("/workouts/date/:date", async (req, res) => {
    const date = req.params.date
    try {
        const workouts = await findAllWorkouts({ date })

        res.send(workouts)
    } catch (e) {
        res.statusCode(500).send("Internal error")
    }
})

app.get("/workout/id/:id", async (req, res) => {
    const id = req.params.id
    try {
        const workout = await findAllWorkouts({ _id: id })

        if (workout.length !== 0) {
            res.send(workout[0])
        } else {
            res.send(null)
        }
    } catch (e) {
        res.statusCode(500).send("Internal error")
    }
})

app.get("/workouts", async (req, res) => {
    const date = req.params.date
    try {
        const workouts = await findAllWorkouts({})

        res.send(workouts)
    } catch (e) {
        res.statusCode(500).send("Internal error")
    }
})

app.post("/exercise", async (req, res) => {
    const data = req.body
    try {
        const exercise = await insertExercise(data)

        res.send(exercise.insertedId)
    } catch (e) {
        res.statusCode(500).send("Internal error")
    }
})

app.get("/exercises", async (req, res) => {
    try {
        const exercises = await findAllExercises({})

        res.send(exercises)
    } catch (e) {
        res.statusCode(500).send("Internal error")
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log("listening on port 3000"))
