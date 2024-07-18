import express from 'express';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
app.use(express.json()) // to be able use or pass json objects
app.use(cookieParser());

app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    console.log('server is running on port 8800!');
});