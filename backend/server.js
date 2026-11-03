const express = require("express");
const cors = require("cors");
require("dotenv").config();
const scamRoutes = require("./routes/scamRoutes")
const connectDB = require("./config/db");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/scams",scamRoutes);

app.get("/",(req,res)=>{
    res.send("Scamshield Backend is running!");
});

const PORT = process.env.PORT || 8080;
connectDB().then(()=>{
   app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
});
