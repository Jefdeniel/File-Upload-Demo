import express from 'express';
import 'dotenv/config';
import { create } from 'express-handlebars';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { VIEWS_PATH } from './consts.js';
import { home } from './controllers/home.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import multer from 'multer';
// file uploading middeleware
import { saveAvatar } from './middleware/saveAvatar.js';

const app = express();
app.use(express.static('public'));

/**
 * Handlebars Init
 */
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', VIEWS_PATH);

/**
 * App Routing
 */
app.get('/', home);

// post endpoint for uploading avatar

app.post('/uploadAvatar', multer().single('avatar'), saveAvatar, (req, res) => {
  res.redirect('/');
});

app.listen(process.env.PORT, () => {
  console.log(
    `Application is running on http://localhost:${process.env.PORT}/.`
  );
});
