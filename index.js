const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const handlebars = require("express-handlebars");
const path = require("path");


    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main',
        runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,}
        }));
        app.set('view engine', 'handlebars');
    // Body Parser
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false}));

    // Public
        // Indica onde está os arquivos staticos (css, js)
        app.use(express.static(path.join(__dirname, "public")));


const clima = {
    key:"05a1ab4c003103fdd17832f15db68890",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

async function atividade(){

}


app.get("/", (req, res)=>{
    res.render("index")
})


app.post("/", async(req, res)=>{
    city = req.body.cidade;
    country = "BR"

    try {
        // response é a resposta do axios, mas eu tiro o data de dentro do response
    const tempo = await axios(`${clima.base}weather?q=${city},${country}&lang=${clima.lang}&units=${clima.units}&APPID=${clima.key}`);

    const  atividade = await axios("https://raw.githubusercontent.com/probono-digital/DesafioTecnico/main/MOCK_DATA.json")

    console.log(atividade)
    console.log(tempo)
    
     //atividade.findAll({ativdade.data.})   

    res.render("clima", {tempo: tempo, atividade: atividade})

    } catch (error) {
        res.render("index")
    }
    
})


app.get("/:city", (req, res)=>{
    console.log("")
})


app.listen("8081", (req,res)=>{
    console.log("Servidor rodando")
})

