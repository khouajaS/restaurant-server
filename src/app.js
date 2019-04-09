import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Restaurant from './models/restaurant';
import Album from './models/album';
import { isInt } from './utils';


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/restaurants/:state', async (req, res) => {
  const { state } = req.params;

  if (state.length !== 2) {
    res.status(400).json({
      message: 'state code must contains two characters',
    });
  } else {
    const restaurants = await Restaurant.find({ state: state.toUpperCase() });
    res.json({ restaurants });
  }
});

app.get('/albums/:albumId', async (req, res) => {
  const { albumId } = req.params;

  if (!isInt(albumId)) {
    res.status(400).json({
      message: 'album id must be an int',
    });
  } else {
    const albums = await Album.find({ albumId: parseInt(albumId, 10) });
    res.json({ albums });
  }
});


export default app;
