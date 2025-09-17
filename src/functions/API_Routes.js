import Express from 'express'

const API_router = Express.Router();

API_router.get('/', (req, res) => {
  res.send('Birds home page')
});

export default API_router;