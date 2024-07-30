import express from 'express'
import cors from "cors"
require('dotenv').config()
import initRouter from './src/routers'
import connectDatabase from './src/config/connectDatabase.js'

const cors = require('cors');
const app = express();
// app.use(cors({
//     // origin: process.env.CLIENT_URL,
//     // methods: ['POST', 'GET', 'PUT', 'DELETE']
//     origin: 'https://homestay-healing-client.vercel.app/'
// }))
app.use(cors());
//Đọc API từ Client gửi lên
app.use(express.json())
app.use(express.urlencoded({extended: true})) //Giúp đọc data dạng form data từ Client gửi lên

initRouter(app)
connectDatabase()

const port = process.env.PORT || 8888 //Nếu cổng 5000 bị lỗi thì tự động chuyển sang cổng 8888
const listener = app.listen(port, () =>{
    console.log(`Server is running on the port ${listener.address().port}`);
})
