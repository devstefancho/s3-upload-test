import express from "express";
import { generateUploadURL } from "./s3.js";
import cors from 'cors';

const app = express();

app.use(express.static("front"));
app.use(cors())

app.get("/s3Url", async (req, res) => {
  const { file_name } = req.query;
  console.log('s3 url api endpoint')
  const url = await generateUploadURL(file_name);
  res.send({ url });
});

app.listen(5500, () => console.log("listening on port 5500"));
