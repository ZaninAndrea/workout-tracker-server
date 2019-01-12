var MongoClient = require("mongodb").MongoClient
require("dotenv").config()

let cachedDB = null

function getDbConnection() {
    return new Promise((resolve, reject) => {
        if (cachedDB === null) {
            MongoClient.connect(
                process.env.DATABASE_URL,
                { useNewUrlParser: true },
                function(err, db) {
                    if (err) reject(err)
                    else {
                        cachedDB = db.db("workout-tracker")
                        resolve(cachedDB)
                    }
                }
            )
        } else {
            resolve(cachedDB)
        }
    })
}

function createCollection(name) {
    return new Promise(async (resolve, reject) => {
        const db = await getDbConnection()

        db.createCollection(name, function(err, res) {
            if (err) throw reject(err)
            else resolve(res)
        })
    })
}

function insertWorkout(data) {
    return new Promise(async (resolve, reject) => {
        const db = await getDbConnection()

        db.collection("workouts").insertOne(data, function(err, res) {
            if (err) reject(err)
            else resolve(res)
        })
    })
}
function findAllWorkouts(query) {
    return new Promise(async (resolve, reject) => {
        const db = await getDbConnection()

        db.collection("workouts")
            .find(query)
            .toArray(function(err, res) {
                if (err) reject(err)
                else resolve(res)
            })
    })
}

module.exports = {
    getDbConnection,
    createCollection,
    insertWorkout,
    findAllWorkouts,
}
