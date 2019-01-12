const { getDbConnection } = require("./database")

;(async () => {
    const db = await getDbConnection()
    db.collection("exercises").drop(function(err, res) {
        if (err) throw err
        console.log(res)
    })
    db.collection("workouts").drop(function(err, res) {
        if (err) throw err
        console.log(res)
    })
})()
