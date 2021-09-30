/**
 * Start SERVER + DB connection
 */

const express = require(`express`);

const PORT = 5000;

const app = express();

app.listen( PORT, () => console.log(`Server listen on Port ${PORT}`));

