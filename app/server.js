const express = require('express');
const cors = require("cors");
let app = express();
const { sequelize } = require('./models/index');

//Configuration
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: process.env.FRONT_URL,
    optionsSuccessStatus: 200,
};

//Middlewares
app.use(express.json());
app.use(express.urlencoded( {extended: false }));

//Routes
app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
})
app.use(cors(corsOptions));

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port ${PORT}`);

    sequelize.authenticate().then(() => {
        console.log('Nous sommes connectés à la base de données');
    });
});