const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAHy6wDlhGYG6He8_4bz9TwVt_dAylh71E");


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log("Server is running on port", port);
});
app.get("/",(req,res)=>{
    res.render("index.ejs", { generatedContent: '' });
    
})

app.get("/mybot", (req, res) => {
    res.render("index.ejs", { generatedContent: '' });
});


app.post("/bot", async (req, res) => {
    let { content } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
        const result = await model.generateContent(content);
        const response = await result.response;
        const text = response.text();
        res.render("index.ejs", { generatedContent: text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.render("index.ejs", { generatedContent: 'Error generating content.' });
    }
});


