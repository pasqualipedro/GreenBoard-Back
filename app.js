/**
 * Start SERVER + DB connection
 */
require('dotenv').config();
const express = require(`express`);
require(`./config/db.config`);
const morgan = require('morgan');

/**Importing routes */
const authRoutes = require('./routes/auth.routes');
const userRoutes = require(`./routes/user.routes`);
const categoryRoutes = require(`./routes/category.routes`);

/**Importing middlewares */
const authMiddleware = require('./Middleware/auth.middleware');

const cors = require(`cors`);
const app = express();
app.use(morgan('dev'));


/**MIDDLEWARES (pass-through function) */
app.use(express.json()); /** allows json inside req.body */
app.use(cors());


/**ROUTES */
/**authentication router */
app.use('/',authRoutes);

/**authorization middleware */
app.use(authMiddleware);

/**private routes */
app.use(`/`, userRoutes);
app.use(`/`, categoryRoutes);/**maybe change later to private - JUST TESTING HERE */

app.listen( process.env.PORT, () => console.log(`Server listen on Port ${process.env.PORT}`));


