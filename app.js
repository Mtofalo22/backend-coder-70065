import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';
import viewsRouter from './src/routes/views.router.js';
import usersRouter from './src/routes/users.router.js';
import methodOverride from 'method-override';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import './src/config/passport.js';
import dotenv from 'dotenv';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(passport.initialize());


app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));


app.use('/products', productsRouter);
app.use('/cart', cartsRouter);
app.use('/', viewsRouter);
app.use('/api/users', usersRouter);
app.use('/api', usersRouter);


app.use(methodOverride('_method'));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
