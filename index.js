import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
import jQuery from "jquery";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("index.ejs")
});

app.post("/",async (req,res)=>{
    var checkbox_1 = req.body.box1
    var checkbox_2 = req.body.box2
    var checkbox_3 = req.body.box3
    console.log(checkbox_1,checkbox_2,checkbox_3);
    try{
        if(typeof(checkbox_1) === "string" && checkbox_2 === undefined && checkbox_3 === undefined ){
            const response = await axios.get("https://v2.jokeapi.dev/joke/"+checkbox_1+"?type=twopart")
            console.log(response.data.setup+response.data.delivery);
            res.render("jokePage.ejs",{joke:response.data.setup+","+response.data.delivery,category:response.data.category+"🧑‍💻"})
        }
        else if(typeof(checkbox_2) === "string" && checkbox_1===undefined&&checkbox_3 === undefined){
            const response = await axios.get("https://v2.jokeapi.dev/joke/"+checkbox_2+"?type=twopart")
            console.log(response.data.setup+response.data.delivery);
            res.render("jokePage.ejs",{joke:response.data.setup+","+response.data.delivery,category:response.data.category+" Ⓜ️"})
        }
        else if(typeof(checkbox_3) === "string" && checkbox_1===undefined&&checkbox_2 === undefined){
            const response = await axios.get("https://v2.jokeapi.dev/joke/"+checkbox_3+"?type=twopart")
            console.log(response.data.setup+response.data.delivery);
            res.render("jokePage.ejs",{joke:response.data.setup+","+response.data.delivery,category:response.data.category+" 💀"})
        }
        else if(checkbox_1 === undefined && checkbox_2 === undefined && checkbox_3 === undefined){
            res.render("index.ejs",{message:"Please choose a category"})
        }
        else{
            res.render("index.ejs",{message:"Please select one category per request"})
        }
    }
    catch(error){
        console.error("Cannot make the request , the error is :",error.message)
        res.render("index.ejs",{error : req.statusCode})
        
    }
})



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});