import { app } from "./app.js";
import { db_connect } from "./DB/db.config.js"

const PORT = process.env.PORT || 7000

// connecting to database
db_connect()

// starting server
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.HOSTNAME}:${PORT}`);
})

// home route
app.get("/", (req, res) => {
    res.send(`<h1>Server is running</h1>`)
})
