import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const key = process.env.API_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/get-weather", async (req, res) => {
    try{
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: req.body.city_name,
                appid: key,
            }
        });
        res.render("index.ejs", { content: result.data });
        console.log(result.data);
    }
    catch(error){
        res.render("index.ejs", {error: error.message, msg: "Invalid Input"});
    }
});

app.listen(port, () => {
    console.log(`Server is Live on Port ${port}`);
})