import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('router works');
    res.send('Post route is working');  // Send a response to the client
});

export default router;