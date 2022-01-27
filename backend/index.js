const express = require('express')
const cors = require('cors');

const CONFIG = require('./config')
const routes = require('./routes/index')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(process.cwd() + "/dist/ItemsStorage/"));
app.use(routes);

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/dist/ItemsStorage/index.html")
});

app.listen(CONFIG.PORT, () => console.log("Server stared on " + CONFIG.PORT))