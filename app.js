/**
 * Start SERVER + DB connection
 */
const express = require(`express`);
require(`./config/db.config`);

/**Importing routes and models */
const userRoutes = require(`./routes/user.routes`);
const categoryRoutes = require(`./routes/category.routes`);
const Transaction = require(`./models/Transaction`);

const PORT = 5000;
const cors = require(`cors`);
const app = express();


/**MIDDLEWARES (pass-through function) */
app.use(express.json()); /** allows json inside req.body */
app.use(cors());


/**ROUTES */
app.use(`/`, userRoutes);
app.use(`/`, categoryRoutes);


app.listen( PORT, () => console.log(`Server listen on Port ${PORT}`));

