import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Restaurant from './models/restaurant';

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


export default app;
