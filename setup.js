const { createCollection } = require("./database")

;(async () => {
    await createCollection("users")
    await createCollection("workouts")

    console.log("SUCCESSFUL SETUP")
    process.exit(0) // force exit even though database connection is still up
})()
