/**
 * Start SERVER + DB connection
 */
const express = require(`express`);
require(`./config/db.config`);

/**Importing routes */
const authRouter = require('./routes/auth.routes');
const userRoutes = require(`./routes/user.routes`);
const categoryRoutes = require(`./routes/category.routes`);

/**Importing middlewares */
const authMiddleware = require('./Middleware/auth.middleware');

const PORT = 5000;
const cors = require(`cors`);
const app = express();


/**MIDDLEWARES (pass-through function) */
app.use(express.json()); /** allows json inside req.body */
app.use(cors());


/**ROUTES */
/**authorization router */
app.use('/',authRouter);

/**authorization middleware */
app.use(authMiddleware);

/**private routes */
app.use(`/`, userRoutes);
app.use(`/`, categoryRoutes);

app.listen( PORT, () => console.log(`Server listen on Port ${PORT}`));

