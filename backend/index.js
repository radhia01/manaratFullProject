const express=require("express")
const cors=require("cors")
const dotenv =require("dotenv")
const app=express()
const client=require("./config/db")
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
       origin: ["http://localhost:3000","https://manarat-frontend.onrender.com"],
       credentials:true
    }
))
dotenv.config()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("welcome to our API ")
})
app.options('*', cors());
const port=process.env.port||3001;


(async () => {
    await client.connect();
    try {
        const results = await client.query("SELECT NOW()");
        console.log(results);
        
        // Démarrer le serveur après la connexion réussie
        app.listen(port, () => {
            console.log(`Serveur en écoute sur le port ${port}`);
        });
        
    } catch (err) {
        console.error("Erreur lors de l'exécution de la requête :", err);
    } finally {
        // Vous pouvez choisir de garder la connexion ouverte ou de la fermer ici
        // client.end();
    }
})();
app.use("/",require("./routes/auth"));
app.use("/",require("./routes/user"));
app.use("/",require("./routes/image"));
app.use("/",require("./routes/like"));
app.use("/",require("./routes/message"));
app.use("/",require("./routes/project"));

