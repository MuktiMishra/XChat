import express from "express";
import cors from 'cors';
const app = express();
app.get('/', (req, res) => {
    return res.json({ text: "hi" });
});
app.use(express.json());
app.use(cors());
export default app;
