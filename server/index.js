require("dotenv").config()
const cookieParser = require("cookie-parser")
const express = require("express")
const path = require("path")

const app = express()

app.use(express.json())
app.use("/public", express.static(path.resolve(__dirname, "public")))
app.use(cookieParser())

app.listen(process.env.PORT, () => {
    console.log("listen")
})