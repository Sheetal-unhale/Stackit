import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

//  routes
import questionRoutes from './routes/questionRoutes.js';
import answerRoutes from './routes/answerRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware
app.use(cors());
app.use(express.json());

//  API Routes
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes); 

//  Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
