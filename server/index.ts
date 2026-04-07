import express, { Request, Response } from 'express';
import cors from 'cors';
import ConnectDB from './config/db';
import router from './routes/post';


const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

app.use('/', router);

ConnectDB
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });