import { Router } from 'express';
const chatRouter = Router();

chatRouter.get('/', (req, res) => {
  console.log("hola")
  res.render('templates/chat', { js: 'chat.js', css: 'chat.css' });
});

export default chatRouter;
