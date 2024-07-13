import express from 'express';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';

const app = express();

app.use(express.json()) // to be able use or pass json objects

app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);

app.listen(8800, () => {
    console.log('server is running on port 8800!');
});