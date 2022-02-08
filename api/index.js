const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotevn = require("dotenv")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const movieRoute = require("./routes/movie")
const listRoute = require("./routes/list")



dotevn.config()

app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/movies", movieRoute)
app.use("/api/lists", listRoute)


main().catch(err => console.log(err));


async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}
app.listen(5000, () => {
    console.log("Sever is ready")
})