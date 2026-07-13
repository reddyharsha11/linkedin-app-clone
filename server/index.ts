import express, { Request, Response } from 'express';
import cors from 'cors';
import ConnectDB from './config/db.js';
import router from './routes/post.js';
import authrouter from './routes/auth.js';

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

app.use('/', router);
app.use('/auth', authrouter);

ConnectDB
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is listening on all networks on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });