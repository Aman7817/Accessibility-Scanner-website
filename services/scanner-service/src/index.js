// import dotenv from"dotenv";

// import { app } from "./app.js"
// dotenv.config({
//     path: './env'
// })

// app.listen(process.env.PORT || 5006, () => {
//     console.log(`Server is running at Port: ${process.env.PORT}`);
// })
import dotenv from 'dotenv';
dotenv.config();

import {app} from './app.js';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running at Port: ${PORT}`);
});
